# Интеграция фронта с WooCommerce REST API

Архив содержит **только изменённые/новые файлы**. Распакуй в корень проекта
`sitny-stolovaya/` с заменой существующих.

## Состав архива

```
.env.example                   # НОВЫЙ — шаблон для ключей
vite.config.js                 # ИЗМЕНЁН — прокси /wp-json → https://sultan-grill-house.test
src/api.js                     # ИЗМЕНЁН — + createOrder() (POST /orders), доставка/самовывоз
src/components/HomePage.jsx    # данные через api.js (useState/useEffect)
src/components/CatalogPage.jsx # данные через api.js (useState/useEffect)
src/components/CartPage.jsx    # ИЗМЕНЁН — реальное оформление заказа, доставка, маска телефона
```

> `src/data/menu.js` НЕ меняется (CATEGORIES как fallback + PROMOS). Не удалять.

## Ключи (твой шаг)

Для оформления заказа нужны **Read/Write**-ключи (Read недостаточно для POST):
WooCommerce → Settings → Advanced → REST API → Add key, Permissions = **Read/Write**,
User = администратор. Впиши `ck_`/`cs_` в `.env` (см. `.env.example`), перезапусти `npm run dev`.

## Оформление заказа

`CartPage.jsx` при сабмите вызывает `createOrder(cart, form)` → `POST /wp-json/wc/v3/orders`:
- `payment_method: cod`, `set_paid: false` — оплата при получении (онлайн-оплаты нет);
- `status: processing` — заказ сразу в работе;
- `line_items` = `{ product_id, quantity }` — **цены не передаются**, WooCommerce берёт
  их из БД по product_id (клиент не может подделать сумму);
- `billing` (имя → first/last, телефон, при доставке — адрес), `customer_note` (комментарий);
- способ получения:
  - **Самовывоз** → `shipping_lines: local_pickup`, доставка 0 ₽;
  - **Доставка** → `shipping_lines: flat_rate`, 150 ₽ или бесплатно от 500 ₽
    (как показано в сводке корзины), адрес дублируется в `shipping`.

После успеха — модалка с номером заказа, корзина очищается. Заказ виден в **WooCommerce → Orders**.

## Маска телефона

Поле телефона форматируется на лету в `+7 (XXX) XXX-XX-XX` (функция `formatPhone`
в `CartPage.jsx`, без внешних библиотек). Ведущая 8 нормализуется к +7. Валидация —
минимум 11 цифр (код + 10 цифр номера).

## Замечание про безопасность ключей

`VITE_`-переменные Vite зашивает в собранный бандл — Read/Write-ключи видны в браузере.
Для локального учебного проекта это допустимо. Для прода создание заказа выносится на
серверный эндпоинт (functions.php) или Store API, чтобы секрет не попадал на клиент.
