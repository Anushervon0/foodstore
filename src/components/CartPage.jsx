import React from 'react';
import { MapPinIcon, TrashIcon, PlusIcon, MinusIcon, CheckIcon, FoodIllustration } from './icons.jsx';
import { CATEGORIES } from '../data/menu.js';
import { plural } from './CatalogPage.jsx';

const FormField = ({ label, error, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: '#5A5550', fontFamily: "'Outfit',sans-serif", letterSpacing: .3 }}>{label}</label>
    {children}
    {error && <span style={{ fontSize: 11, color: '#D04020', fontFamily: "'Outfit',sans-serif" }}>{error}</span>}
  </div>
);

const OrderSuccessModal = ({ form, total, onClose }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,22,18,0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300, padding: 24 }}>
    <div style={{ background: 'white', borderRadius: 24, padding: '44px 40px', maxWidth: 440, width: '100%', textAlign: 'center', boxShadow: '0 32px 80px rgba(0,0,0,0.3)' }}>
      <div style={{ width: 72, height: 72, background: '#E8F4E8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
        <CheckIcon size={32} />
      </div>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", color: '#1A2B1E', fontSize: 28, margin: '0 0 10px', fontWeight: 700 }}>Заказ принят!</h2>
      <p style={{ color: '#7A756E', fontFamily: "'Outfit',sans-serif", fontSize: 14, lineHeight: 1.65, margin: '0 0 8px' }}>
        {form.name}, ваш заказ на сумму <strong>{total} ₽</strong> принят.
      </p>
      <p style={{ color: '#B0A898', fontFamily: "'Outfit',sans-serif", fontSize: 13, margin: '0 0 28px' }}>
        {form.delivery === 'delivery' ? 'Курьер свяжется с вами в течение 5 минут.' : 'Заказ будет готов через 20–30 минут.'}
      </p>
      <button style={{ background: '#1E3328', color: 'white', border: 'none', borderRadius: 12, padding: '14px 32px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit',sans-serif" }}
        onClick={onClose}
      >На главную</button>
    </div>
  </div>
);

const CartPage = ({ cart, onUpdate, onRemove, setPage }) => {
  const [form, setForm] = React.useState({ name: '', phone: '', address: '', comment: '', delivery: 'pickup' });
  const [errors, setErrors] = React.useState({});
  const [showSuccess, setShowSuccess] = React.useState(false);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Введите имя';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) e.phone = 'Укажите корректный номер';
    if (form.delivery === 'delivery' && !form.address.trim()) e.address = 'Укажите адрес доставки';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    cart.forEach(item => onRemove(item.id));
    setPage('home');
  };

  if (cart.length === 0 && !showSuccess) return (
    <main style={{ background: '#F4F1EC', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C0B8B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", color: '#1A2B1E', margin: 0, fontSize: 26 }}>Корзина пуста</h2>
        <p style={{ color: '#9A8C7E', fontFamily: "'Outfit',sans-serif", fontSize: 14, margin: 0 }}>Добавьте блюда из каталога</p>
        <button style={crS.primaryBtn} onClick={() => setPage('catalog')}>Перейти в каталог</button>
      </div>
      {showSuccess && <OrderSuccessModal form={form} total={total} onClose={handleSuccessClose} />}
    </main>
  );

  return (
    <main style={{ background: '#F4F1EC', minHeight: '100vh', paddingBottom: 80 }}>
      {showSuccess && <OrderSuccessModal form={form} total={total} onClose={handleSuccessClose} />}

      <div style={crS.hero}>
        <div style={crS.container}>
          <span style={crS.heroLabel}>Оформление</span>
          <h1 style={crS.heroTitle}>Корзина</h1>
          <p style={crS.heroSub}>{itemCount} {plural(itemCount, ['позиция', 'позиции', 'позиций'])} · {total} ₽</p>
        </div>
      </div>

      <div style={crS.container}>
        <div style={crS.layout}>
          <div>
            <h2 style={crS.colTitle}>Ваш заказ</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {cart.map(item => {
                const cat = CATEGORIES.find(c => c.id === item.cat) || {};
                return (
                  <div key={item.id} style={crS.cartItem}>
                    <div style={{ ...crS.cartThumb, background: cat.color || '#F0EDE8' }}>
                      {item.photo
                        ? <img src={item.photo} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} onError={e => { e.target.style.display = 'none'; }} />
                        : <FoodIllustration cat={item.cat} size={48} />
                      }
                    </div>
                    <div style={crS.cartInfo}>
                      <div style={crS.cartName}>{item.name}</div>
                      <div style={crS.cartMeta}>{item.weight} · {item.kcal} ккал</div>
                    </div>
                    <div style={crS.qtyRow}>
                      <button style={crS.qtyBtn} onClick={() => onUpdate(item.id, item.qty - 1)}><MinusIcon size={13} /></button>
                      <span style={crS.qtyNum}>{item.qty}</span>
                      <button style={crS.qtyBtn} onClick={() => onUpdate(item.id, item.qty + 1)}><PlusIcon size={13} /></button>
                    </div>
                    <div style={crS.cartPrice}>{item.price * item.qty} ₽</div>
                    <button style={crS.removeBtn} onClick={() => onRemove(item.id)}
                      onMouseEnter={e => e.currentTarget.style.color = '#C04030'}
                      onMouseLeave={e => e.currentTarget.style.color = '#C0B8B0'}
                    ><TrashIcon /></button>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={crS.formCol}>
            <div style={crS.formCard}>
              <h2 style={crS.colTitle}>Оформление заказа</h2>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={crS.toggle}>
                  {[['pickup', 'Самовывоз'], ['delivery', 'Доставка']].map(([val, lbl]) => (
                    <button key={val} type="button"
                      style={{ ...crS.toggleBtn, ...(form.delivery === val ? crS.toggleActive : {}) }}
                      onClick={() => setForm(f => ({ ...f, delivery: val }))}
                    >{lbl}</button>
                  ))}
                </div>
                {form.delivery === 'pickup' && (
                  <div style={crS.pickupInfo}>
                    <MapPinIcon size={14} /> <span>ул. Германа Титова, 6 · Пн–Пт 8:00–20:00</span>
                  </div>
                )}
                <FormField label="Имя *" error={errors.name}>
                  <input style={{ ...crS.input, ...(errors.name ? crS.inputErr : {}) }}
                    placeholder="Ваше имя" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = '#C4673A'}
                    onBlur={e => e.target.style.borderColor = errors.name ? '#D04020' : '#E5E0D8'}
                  />
                </FormField>
                <FormField label="Телефон *" error={errors.phone}>
                  <input style={{ ...crS.input, ...(errors.phone ? crS.inputErr : {}) }}
                    placeholder="+7 (___) ___-__-__" value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = '#C4673A'}
                    onBlur={e => e.target.style.borderColor = errors.phone ? '#D04020' : '#E5E0D8'}
                  />
                </FormField>
                {form.delivery === 'delivery' && (
                  <FormField label="Адрес доставки *" error={errors.address}>
                    <input style={{ ...crS.input, ...(errors.address ? crS.inputErr : {}) }}
                      placeholder="Улица, дом, квартира" value={form.address}
                      onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = '#C4673A'}
                      onBlur={e => e.target.style.borderColor = errors.address ? '#D04020' : '#E5E0D8'}
                    />
                  </FormField>
                )}
                <FormField label="Комментарий к заказу">
                  <textarea style={{ ...crS.input, minHeight: 72, resize: 'vertical' }}
                    placeholder="Пожелания к заказу..." value={form.comment}
                    onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = '#C4673A'}
                    onBlur={e => e.target.style.borderColor = '#E5E0D8'}
                  />
                </FormField>
                <div style={crS.summary}>
                  <div style={crS.summaryRow}><span>Сумма заказа</span><span>{total} ₽</span></div>
                  {form.delivery === 'delivery' && (
                    <div style={crS.summaryRow}>
                      <span>Доставка</span>
                      <span style={{ color: total >= 500 ? '#2D6B3A' : '#1A2B1E' }}>{total >= 500 ? 'Бесплатно' : '150 ₽'}</span>
                    </div>
                  )}
                  <div style={crS.summaryTotal}>
                    <span>Итого</span>
                    <span>{total + (form.delivery === 'delivery' && total < 500 ? 150 : 0)} ₽</span>
                  </div>
                </div>
                <button type="submit" style={{ ...crS.primaryBtn, width: '100%' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#A8552E'}
                  onMouseLeave={e => e.currentTarget.style.background = '#C4673A'}
                >Оформить заказ</button>
                <p style={crS.hint}>Нажимая кнопку, вы соглашаетесь с условиями доставки и обработкой персональных данных</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const crS = {
  hero: { background: '#1E3328', padding: '52px 0 40px' },
  container: { maxWidth: 1240, margin: '0 auto', padding: '0 28px' },
  heroLabel: { fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: "'Outfit',sans-serif", display: 'block', marginBottom: 10 },
  heroTitle: { fontSize: 'clamp(28px,4vw,46px)', fontFamily: "'Cormorant Garamond',serif", color: 'white', margin: '0 0 8px', fontWeight: 700 },
  heroSub: { fontSize: 15, color: 'rgba(255,255,255,0.5)', margin: 0, fontFamily: "'Outfit',sans-serif" },
  layout: { display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, paddingTop: 36 },
  colTitle: { fontSize: 22, fontFamily: "'Cormorant Garamond',serif", color: '#1A2B1E', margin: '0 0 18px', fontWeight: 700 },
  cartItem: { background: 'white', borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  cartThumb: { width: 60, height: 60, borderRadius: 12, overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cartInfo: { flex: 1, minWidth: 0 },
  cartName: { fontSize: 15, fontWeight: 600, color: '#1A2B1E', fontFamily: "'Outfit',sans-serif", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  cartMeta: { fontSize: 12, color: '#B0A898', fontFamily: "'Outfit',sans-serif", marginTop: 3 },
  qtyRow: { display: 'flex', alignItems: 'center', background: '#F4F1EC', borderRadius: 10, padding: '3px', flexShrink: 0 },
  qtyBtn: { background: 'none', border: 'none', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1A2B1E', borderRadius: 8 },
  qtyNum: { width: 28, textAlign: 'center', fontSize: 14, fontWeight: 700, fontFamily: "'Outfit',sans-serif", color: '#1A2B1E' },
  cartPrice: { width: 64, textAlign: 'right', fontSize: 16, fontWeight: 700, fontFamily: "'Outfit',sans-serif", color: '#1A2B1E', flexShrink: 0 },
  removeBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#C0B8B0', display: 'flex', padding: 4, transition: 'color .2s' },
  formCol: {},
  formCard: { background: 'white', borderRadius: 20, padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', position: 'sticky', top: 88 },
  toggle: { display: 'flex', background: '#F4F1EC', borderRadius: 12, padding: 4 },
  toggleBtn: { flex: 1, border: 'none', borderRadius: 9, padding: '10px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit',sans-serif", color: '#7A756E', background: 'none', transition: 'all .2s' },
  toggleActive: { background: 'white', color: '#1A2B1E', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  pickupInfo: { display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#7A756E', fontFamily: "'Outfit',sans-serif", background: '#F4F1EC', padding: '10px 14px', borderRadius: 10 },
  input: { width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #E5E0D8', fontSize: 14, fontFamily: "'Outfit',sans-serif", color: '#1A2B1E', outline: 'none', background: '#FAFAF8', boxSizing: 'border-box', transition: 'border-color .2s' },
  inputErr: { borderColor: '#D04020' },
  summary: { background: '#F8F5F0', borderRadius: 12, padding: '16px', display: 'flex', flexDirection: 'column', gap: 8 },
  summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: 13, fontFamily: "'Outfit',sans-serif", color: '#7A756E' },
  summaryTotal: { display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700, fontFamily: "'Outfit',sans-serif", color: '#1A2B1E', borderTop: '1px solid #E5E0D8', paddingTop: 10, marginTop: 4 },
  primaryBtn: { background: '#C4673A', color: 'white', border: 'none', borderRadius: 12, padding: '14px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit',sans-serif", transition: 'background .2s', letterSpacing: .3 },
  hint: { fontSize: 11, color: '#B0A898', textAlign: 'center', margin: 0, fontFamily: "'Outfit',sans-serif", lineHeight: 1.5 },
};

export default CartPage;
