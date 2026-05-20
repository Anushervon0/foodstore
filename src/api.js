// src/api.js
// Модуль работы с WooCommerce REST API (headless).
// Тянет товары и категории из WordPress/WooCommerce и приводит их
// к тому же формату, что и мок src/data/menu.js (MENU + CATEGORIES),
// чтобы существующие компоненты (HomePage/CatalogPage/ProductCard) работали без изменений.
//
// КУДА ВСТАВИТЬ КЛЮЧИ:
//   В режиме разработки ключи берутся из .env (см. .env.example в корне проекта):
//     VITE_WC_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxx
//     VITE_WC_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxx
//   Файл .env положить в корень проекта рядом с package.json и перезапустить `npm run dev`.
//   Запросы идут на /wp-json (проксируется Vite на http://sultan-grill-house.test).

const CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY || '';
const CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET || '';

// База через прокси Vite (см. vite.config.js). В проде можно заменить на абсолютный URL.
const API_BASE = '/wp-json/wc/v3';

// Цвета категорий — хардкод по slug (как и было в моке, WooCommerce их не отдаёт).
const CATEGORY_COLORS = {
  soups:    '#E8D5B7',
  mains:    '#C8DFC8',
  salads:   '#D4EAD4',
  desserts: '#F0D4D4',
  drinks:   '#D4DCF0',
  bakery:   '#F0E4C8',
};

// Порядок категорий для отображения (как в исходном CATEGORIES).
const CATEGORY_ORDER = ['soups', 'mains', 'salads', 'desserts', 'drinks', 'bakery'];

// Запасные подписи категорий на случай, если WC вернёт пустое имя.
const CATEGORY_FALLBACK_LABELS = {
  soups:    'Первые блюда',
  mains:    'Вторые блюда',
  salads:   'Салаты',
  desserts: 'Десерты',
  drinks:   'Напитки',
  bakery:   'Выпечка',
};

// Собирает query-строку с авторизационными ключами WooCommerce.
function withAuth(params = {}) {
  const search = new URLSearchParams(params);
  if (CONSUMER_KEY) search.set('consumer_key', CONSUMER_KEY);
  if (CONSUMER_SECRET) search.set('consumer_secret', CONSUMER_SECRET);
  return search.toString();
}

async function request(path, params) {
  const url = `${API_BASE}${path}?${withAuth(params)}`;
  const res = await fetch(url);
  if (!res.ok) {
    let detail = '';
    try {
      const body = await res.json();
      detail = body && body.message ? ` — ${body.message}` : '';
    } catch (_) { /* ignore parse errors */ }
    throw new Error(`WooCommerce API ${res.status} ${res.statusText}${detail}`);
  }
  return res.json();
}

// Достаёт число из строки/числа WooCommerce ("180.00" -> 180).
function toNumber(value, fallback = 0) {
  if (value === null || value === undefined || value === '') return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

// Убирает HTML-теги из short_description WooCommerce (приходит в <p>...</p>).
function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')   // теги
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/\s+/g, ' ')
    .trim();
}

// Маппинг одного товара WooCommerce -> формат элемента MENU.
function mapProduct(p) {
  // Категория: берём slug первой категории товара.
  const cats = Array.isArray(p.categories) ? p.categories : [];
  const cat = cats.length > 0 ? cats[0].slug : '';

  // Фото: featured image -> первое изображение из массива images.
  const images = Array.isArray(p.images) ? p.images : [];
  const photo = images.length > 0 ? images[0].src : '';

  // ACF-поля приходят в ключе meta_fields (см. register_rest_field в functions.php).
  const meta = p.meta_fields || {};
  const badgeRaw = meta.badge;
  const badge = badgeRaw && badgeRaw !== 'нет' && badgeRaw !== '0' ? badgeRaw : null;

  return {
    id: p.id,
    cat,
    name: p.name || '',
    desc: stripHtml(p.short_description || p.description || ''),
    price: toNumber(p.price !== undefined ? p.price : p.regular_price, 0),
    weight: meta.weight_display || '',
    kcal: toNumber(meta.calories, 0),
    rating: toNumber(p.average_rating, 0),
    reviews: toNumber(p.rating_count, 0),
    popular: Boolean(p.featured),
    badge,
    photo,
  };
}

// Получить все товары и привести к формату MENU.
// per_page=50 покрывает текущие 19 товаров с запасом.
export async function fetchProducts() {
  const data = await request('/products', { per_page: '50', status: 'publish' });
  const list = Array.isArray(data) ? data : [];
  return list.map(mapProduct);
}

// Получить категории и привести к формату CATEGORIES (id/label/color).
// Если запрос не удался — отдаём хардкод по известным slug'ам (graceful fallback).
export async function fetchCategories() {
  let raw = [];
  try {
    const data = await request('/products/categories', { per_page: '50', hide_empty: 'false' });
    raw = Array.isArray(data) ? data : [];
  } catch (_) {
    raw = [];
  }

  // Только наши известные категории, в нужном порядке.
  const bySlug = {};
  raw.forEach(c => { bySlug[c.slug] = c; });

  return CATEGORY_ORDER
    .map(slug => {
      const wc = bySlug[slug];
      return {
        id: slug,
        label: (wc && wc.name) || CATEGORY_FALLBACK_LABELS[slug] || slug,
        color: CATEGORY_COLORS[slug] || '#EEE8E0',
      };
    });
}

// POST-запрос к WooCommerce (ключи в query, как и в request()).
async function post(path, body) {
  const url = `${API_BASE}${path}?${withAuth()}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  let data = null;
  try { data = await res.json(); } catch (_) { /* нет тела */ }
  if (!res.ok) {
    const detail = data && data.message ? ` — ${data.message}` : '';
    throw new Error(`WooCommerce API ${res.status} ${res.statusText}${detail}`);
  }
  return data;
}

// Разбивает «Имя Фамилия» на first/last для billing WooCommerce.
function splitName(full) {
  const parts = String(full || '').trim().split(/\s+/);
  return { first: parts[0] || '', last: parts.slice(1).join(' ') };
}

// Создать заказ в WooCommerce.
// cart  — массив позиций корзины (как на фронте), нужен только id (= product_id в WC) и qty.
// form  — { name, phone, comment, delivery: 'pickup'|'delivery', address }.
//         delivery: оплата при получении в любом случае.
// Цены НЕ передаём: WooCommerce берёт их из БД по product_id (защита от подмены на клиенте).
export async function createOrder(cart, form) {
  const { first, last } = splitName(form.name);
  const isDelivery = form.delivery === 'delivery';

  // Сумма товаров (для определения бесплатной доставки от 500 ₽ — как на фронте).
  const goodsTotal = (cart || []).reduce((s, i) => s + i.price * i.qty, 0);
  const shippingCost = isDelivery ? (goodsTotal >= 500 ? 0 : 150) : 0;

  const billing = {
    first_name: first,
    last_name: last,
    phone: String(form.phone || ''),
  };
  if (isDelivery && form.address) billing.address_1 = String(form.address);

  const payload = {
    payment_method: 'cod',                 // Cash on delivery — оплата при получении
    payment_method_title: 'Оплата при получении',
    set_paid: false,                       // оплата на месте, не онлайн
    status: 'processing',                   // заказ принят в работу
    billing,
    line_items: (cart || []).map(item => ({
      product_id: item.id,
      quantity: item.qty,
    })),
    customer_note: form.comment ? String(form.comment) : '',
  };

  if (isDelivery) {
    payload.shipping = {
      first_name: first,
      last_name: last,
      address_1: String(form.address || ''),
    };
    payload.shipping_lines = [{
      method_id: 'flat_rate',
      method_title: shippingCost === 0 ? 'Доставка (бесплатно)' : 'Доставка',
      total: String(shippingCost),
    }];
  } else {
    payload.shipping_lines = [{
      method_id: 'local_pickup',
      method_title: 'Самовывоз',
      total: '0',
    }];
  }

  return post('/orders', payload);
}
