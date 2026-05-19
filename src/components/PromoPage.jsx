import React from 'react';
import { ArrowRight } from './icons.jsx';
import { PROMOS } from '../data/menu.js';

const PromoPage = ({ onCatalog }) => {
  const promoList = PROMOS;
  const [email, setEmail] = React.useState('');
  const [subDone, setSubDone] = React.useState(false);

  const handleSub = (e) => {
    e.preventDefault();
    if (email.includes('@')) { setSubDone(true); }
  };

  const timeOfDay = [
    { tag: 'До 11:00', title: 'Завтрак', price: 'от 190 ₽', desc: 'Каша, яйца, блинчики, выпечка и горячий напиток — заряд сил с утра.', items: ['Блинчики с творогом', 'Круассан со шпинатом', 'Чай или кофе'], bg: '#F5EDD8', accent: '#8A6A3A', photo: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop&q=85' },
    { tag: '12:00–15:00', title: 'Бизнес-ланч', price: 'от 290 ₽', desc: 'Три блюда по специальной цене. Быстро, сытно и вкусно — без лишних затрат.', items: ['Суп на выбор', 'Второе с гарниром', 'Компот или чай'], bg: '#E8F0E8', accent: '#2D6B3A', photo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&q=85' },
    { tag: '17:00–20:00', title: 'Вечернее меню', price: '−10%', desc: 'Скидка 10% на все блюда в вечернее время. Тихий ужин в уютной атмосфере.', items: ['Всё меню −10%', 'Тирамису в подарок', 'При заказе от 600 ₽'], bg: '#E8E0F0', accent: '#5A3A8A', photo: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop&q=85' },
  ];

  return (
    <main style={{ background: '#F4F1EC', minHeight: '100vh', paddingBottom: 80 }}>
      {/* Hero */}
      <div style={prS.hero}>
        <div style={prS.heroPatterns} />
        <div style={prS.container}>
          <span style={prS.heroLabel}>Специальные предложения</span>
          <h1 style={prS.heroTitle}>Акции и скидки</h1>
          <p style={prS.heroSub}>Выгодные предложения для наших гостей — каждый день</p>
          <div style={prS.heroStats}>
            {[['4', 'активных акции'], ['−15%', 'на салаты в мае'], ['290 ₽', 'бизнес-ланч']].map(([n, l]) => (
              <div key={l} style={prS.heroStat}>
                <span style={prS.heroStatNum}>{n}</span>
                <span style={prS.heroStatLbl}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={prS.container}>
        {/* Featured */}
        <div style={{ paddingTop: 44 }}>
          <div style={prS.featuredWrap}>
            <FeaturedPromo promo={promoList[0]} onCatalog={onCatalog} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {promoList.slice(1, 3).map(p => <PromoCard key={p.id} promo={p} onCatalog={onCatalog} />)}
            </div>
          </div>
        </div>

        {/* Birthday banner */}
        <div style={{ marginTop: 20 }}>
          <PromoBanner promo={promoList[3]} onCatalog={onCatalog} />
        </div>

        {/* Time-of-day */}
        <div style={{ marginTop: 52 }}>
          <span style={prS.sectionLabel}>По времени суток</span>
          <h2 style={{ ...prS.sectionTitle, marginBottom: 28 }}>Специальные меню</h2>
          <div style={prS.timeGrid}>
            {timeOfDay.map(t => (
              <div key={t.tag} style={{ ...prS.timeCard, background: t.bg }}>
                <div style={prS.timeImgWrap}>
                  <img src={t.photo} alt={t.title} style={prS.timeImg} onError={e => e.target.style.display = 'none'} />
                </div>
                <div style={prS.timeBody}>
                  <span style={{ ...prS.timeBadge, background: t.accent }}>{t.tag}</span>
                  <h3 style={{ ...prS.timeTitle, color: t.accent }}>{t.title}</h3>
                  <p style={prS.timeDesc}>{t.desc}</p>
                  <ul style={prS.timeItems}>
                    {t.items.map(item => <li key={item} style={prS.timeItem}>• {item}</li>)}
                  </ul>
                  <div style={{ ...prS.timePrice, color: t.accent }}>{t.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business lunch detail */}
        <div style={prS.bizSection}>
          <div style={prS.bizLeft}>
            <span style={prS.sectionLabel}>Ежедневно 12:00–15:00</span>
            <h2 style={{ ...prS.sectionTitle, color: 'white', margin: '12px 0 16px' }}>Бизнес-ланч</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: "'Outfit',sans-serif", lineHeight: 1.7, margin: '0 0 24px' }}>
              Идеально для занятых людей, которые ценят качество.
            </p>
            <div style={prS.bizCombo}>
              {[['Первое блюдо', 'Борщ, суп или крем-суп на выбор'], ['Второе блюдо', 'Котлета, гуляш или рыба с гарниром'], ['Напиток', 'Чай, компот или сок']].map(([t, d]) => (
                <div key={t} style={prS.bizItem}>
                  <div style={prS.bizItemDot} />
                  <div>
                    <div style={prS.bizItemTitle}>{t}</div>
                    <div style={prS.bizItemDesc}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={prS.bizPriceRow}>
              <span style={prS.bizPriceLabel}>Стоимость комбо:</span>
              <span style={prS.bizPrice}>от 290 ₽</span>
            </div>
            <button style={prS.bizBtn} onClick={onCatalog}
              onMouseEnter={e => e.currentTarget.style.background = '#A8552E'}
              onMouseLeave={e => e.currentTarget.style.background = '#C4673A'}
            >Заказать бизнес-ланч</button>
          </div>
          <div style={prS.bizRight}>
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&h=600&fit=crop&q=85" alt="Бизнес-ланч" style={prS.bizImg} onError={e => e.target.style.display = 'none'} />
            <div style={prS.bizBadge}>
              <div style={prS.bizBadgeNum}>290</div>
              <div style={prS.bizBadgeSub}>рублей</div>
            </div>
          </div>
        </div>

        {/* Loyalty */}
        <div style={prS.loyalty}>
          <span style={prS.sectionLabel}>Накопительная система</span>
          <h2 style={{ ...prS.sectionTitle, marginBottom: 12 }}>Программа лояльности</h2>
          <p style={prS.loyaltySub}>Копите баллы с каждым заказом и получайте скидки на следующие визиты</p>
          <div style={prS.loyaltyGrid}>
            {[
              { level: 'Гость', icon: '☕', from: '0 ₽', discount: '0%', color: 'white', border: '#E5E0D8', text: '#7A756E', numColor: '#1A2B1E', desc: 'Стандартное меню' },
              { level: 'Завсегдатай', icon: '🥗', from: '5 000 ₽', discount: '3%', color: '#E8F0E8', border: '#C8DFC8', text: '#2D6B3A', numColor: '#2D6B3A', desc: 'Скидка на следующий заказ' },
              { level: 'Постоянный', icon: '🍽️', from: '15 000 ₽', discount: '5%', color: '#FFF4E8', border: '#F0D4A8', text: '#C4673A', numColor: '#C4673A', desc: 'Приоритетная сборка' },
              { level: 'VIP Гость', icon: '⭐', from: '30 000 ₽', discount: '10%', color: '#1E3328', border: '#2A4A34', text: '#E8A838', numColor: '#E8A838', desc: 'Персональный менеджер' },
            ].map(l => (
              <div key={l.level} style={{ ...prS.loyaltyCard, background: l.color, border: `1.5px solid ${l.border}` }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{l.icon}</div>
                <div style={{ ...prS.loyaltyLevel, color: l.numColor }}>{l.level}</div>
                <div style={{ ...prS.loyaltyDiscount, color: l.numColor }}>{l.discount}</div>
                <div style={{ ...prS.loyaltyFrom, color: l.text }}>от {l.from}</div>
                <div style={{ ...prS.loyaltyDesc, color: l.text }}>{l.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div style={prS.newsletter}>
          <h2 style={{ ...prS.sectionTitle, color: 'white', margin: '0 0 8px' }}>Подпишитесь на акции</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', fontFamily: "'Outfit',sans-serif", margin: '0 0 24px' }}>
            Первыми узнавайте о новых предложениях и скидках
          </p>
          {subDone ? (
            <div style={{ color: '#E8A838', fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 15 }}>✓ Вы подписаны! Спасибо.</div>
          ) : (
            <form onSubmit={handleSub} style={{ display: 'flex', gap: 10, maxWidth: 440 }}>
              <input type="email" placeholder="Ваш email" value={email} onChange={e => setEmail(e.target.value)}
                style={{ flex: 1, padding: '13px 16px', borderRadius: 12, border: 'none', fontSize: 14, fontFamily: "'Outfit',sans-serif", outline: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', caretColor: '#C4673A' }} />
              <button type="submit" style={{ background: '#C4673A', color: 'white', border: 'none', borderRadius: 12, padding: '13px 22px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit',sans-serif", whiteSpace: 'nowrap' }}>
                Подписаться
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

const FeaturedPromo = ({ promo, onCatalog }) => {
  const [imgErr, setImgErr] = React.useState(false);
  return (
    <div style={{ ...prS.featCard, background: promo.color, position: 'relative', overflow: 'hidden', borderRadius: 20, minHeight: 320 }}>
      {!imgErr ? <img src={promo.photo} alt={promo.title} style={prS.featImg} onError={() => setImgErr(true)} />
        : <div style={{ background: promo.color, width: '100%', height: '100%' }} />}
      <div style={{ ...prS.featOverlay, background: `linear-gradient(to top, ${promo.color} 30%, rgba(0,0,0,0.2) 100%)` }} />
      <span style={prS.featBadge}>{promo.badge}</span>
      <div style={prS.featContent}>
        <div style={prS.featMeta}>{promo.label}</div>
        <h3 style={prS.featTitle}>{promo.title}</h3>
        <p style={prS.featDesc}>{promo.desc}</p>
        <div style={prS.featFooter}>
          {promo.price && <span style={prS.featPrice}>от {promo.price} ₽</span>}
          <button style={prS.featBtn} onClick={onCatalog}>Воспользоваться <ArrowRight size={14} /></button>
        </div>
      </div>
    </div>
  );
};

const PromoCard = ({ promo, onCatalog }) => {
  const [imgErr, setImgErr] = React.useState(false);
  return (
    <div style={{ ...prS.sideCard }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.13)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)'; }}
    >
      <div style={prS.sideImgWrap}>
        {!imgErr ? <img src={promo.photo} alt={promo.title} style={prS.sideImg} onError={() => setImgErr(true)} />
          : <div style={{ background: promo.color, width: '100%', height: '100%' }} />}
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${promo.color} 20%, transparent 70%)` }} />
        <span style={prS.sideBadge}>{promo.badge}</span>
        <div style={prS.sideOverContent}>
          <div style={prS.sideMeta}>{promo.label}</div>
          <h3 style={prS.sideTitle}>{promo.title}</h3>
        </div>
      </div>
      <div style={prS.sideBody}>
        <p style={prS.sideDesc}>{promo.desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={prS.sideUntil}>До: {promo.until}</span>
          <button style={prS.sideBtn} onClick={onCatalog}>Подробнее <ArrowRight size={13} /></button>
        </div>
      </div>
    </div>
  );
};

const PromoBanner = ({ promo, onCatalog }) => (
  <div style={prS.bannerWrap}>
    <div style={prS.bannerLeft}>
      <span style={prS.featBadge}>{promo.badge}</span>
      <h3 style={{ ...prS.sectionTitle, color: 'white', margin: '12px 0 8px' }}>{promo.title}</h3>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: "'Outfit',sans-serif", lineHeight: 1.65, margin: '0 0 20px' }}>{promo.desc}</p>
      <button style={prS.bizBtn} onClick={onCatalog}
        onMouseEnter={e => e.currentTarget.style.background = '#A8552E'}
        onMouseLeave={e => e.currentTarget.style.background = '#C4673A'}
      >Узнать больше</button>
    </div>
    <div style={prS.bannerRight}>
      <img src={promo.photo} alt={promo.title} style={prS.bannerImg} onError={e => e.target.style.display = 'none'} />
    </div>
  </div>
);

const prS = {
  hero: { background: '#1E3328', padding: '52px 0 44px', position: 'relative', overflow: 'hidden' },
  heroPatterns: { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(196,103,58,0.18) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(196,103,58,0.1) 0%, transparent 40%)', pointerEvents: 'none' },
  container: { maxWidth: 1240, margin: '0 auto', padding: '0 28px' },
  heroLabel: { fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: "'Outfit',sans-serif", display: 'block', marginBottom: 10 },
  heroTitle: { fontSize: 'clamp(28px,4vw,46px)', fontFamily: "'Cormorant Garamond',serif", color: 'white', margin: '0 0 10px', fontWeight: 700 },
  heroSub: { fontSize: 15, color: 'rgba(255,255,255,0.55)', margin: '0 0 24px', fontFamily: "'Outfit',sans-serif" },
  heroStats: { display: 'flex', gap: 32 },
  heroStat: { display: 'flex', flexDirection: 'column', gap: 2 },
  heroStatNum: { fontSize: 24, fontWeight: 700, color: '#E8A838', fontFamily: "'Cormorant Garamond',serif" },
  heroStatLbl: { fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: "'Outfit',sans-serif" },
  sectionLabel: { fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: '#C4673A', fontFamily: "'Outfit',sans-serif", display: 'block', marginBottom: 8 },
  sectionTitle: { fontSize: 'clamp(22px,3vw,30px)', fontFamily: "'Cormorant Garamond',serif", color: '#1A2B1E', margin: '0 0 24px', fontWeight: 700 },
  featuredWrap: { display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 },
  featCard: { position: 'relative', borderRadius: 20, overflow: 'hidden', minHeight: 320 },
  featImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' },
  featOverlay: { position: 'absolute', inset: 0 },
  featBadge: { position: 'absolute', top: 16, left: 16, background: '#C4673A', color: 'white', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, fontFamily: "'Outfit',sans-serif", zIndex: 1 },
  featContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 24px 28px', zIndex: 1 },
  featMeta: { fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: "'Outfit',sans-serif", marginBottom: 6, letterSpacing: 1 },
  featTitle: { fontSize: 22, fontFamily: "'Cormorant Garamond',serif", color: 'white', margin: '0 0 8px', fontWeight: 700 },
  featDesc: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: "'Outfit',sans-serif", margin: '0 0 16px', lineHeight: 1.6 },
  featFooter: { display: 'flex', alignItems: 'center', gap: 12 },
  featPrice: { fontSize: 20, fontWeight: 700, color: '#E8A838', fontFamily: "'Outfit',sans-serif" },
  featBtn: { display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none', borderRadius: 10, padding: '9px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit',sans-serif", backdropFilter: 'blur(8px)' },
  sideCard: { background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', transition: 'transform .25s, box-shadow .25s' },
  sideImgWrap: { height: 140, position: 'relative', overflow: 'hidden' },
  sideImg: { width: '100%', height: '100%', objectFit: 'cover' },
  sideBadge: { position: 'absolute', top: 10, right: 10, background: '#C4673A', color: 'white', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20, fontFamily: "'Outfit',sans-serif" },
  sideOverContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 16px' },
  sideMeta: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontFamily: "'Outfit',sans-serif", letterSpacing: 1 },
  sideTitle: { fontSize: 16, fontFamily: "'Cormorant Garamond',serif", color: 'white', margin: 0, fontWeight: 700 },
  sideBody: { padding: '14px 16px' },
  sideDesc: { fontSize: 12, color: '#7A756E', fontFamily: "'Outfit',sans-serif", lineHeight: 1.55, margin: '0 0 12px' },
  sideUntil: { fontSize: 11, color: '#B0A898', fontFamily: "'Outfit',sans-serif" },
  sideBtn: { display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: '#C4673A', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit',sans-serif" },
  bannerWrap: { background: '#3A1E2D', borderRadius: 20, overflow: 'hidden', display: 'flex', alignItems: 'stretch' },
  bannerLeft: { flex: 1, padding: '36px 40px' },
  bannerRight: { width: 260, flexShrink: 0, position: 'relative' },
  bannerImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  timeGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 },
  timeCard: { borderRadius: 16, overflow: 'hidden' },
  timeImgWrap: { height: 160, overflow: 'hidden' },
  timeImg: { width: '100%', height: '100%', objectFit: 'cover' },
  timeBody: { padding: '16px 20px 20px' },
  timeBadge: { display: 'inline-block', color: 'white', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20, marginBottom: 8, fontFamily: "'Outfit',sans-serif" },
  timeTitle: { fontSize: 20, fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, margin: '0 0 8px' },
  timeDesc: { fontSize: 13, color: '#5A5550', lineHeight: 1.55, fontFamily: "'Outfit',sans-serif", margin: '0 0 12px' },
  timeItems: { listStyle: 'none', padding: 0, margin: '0 0 12px', display: 'flex', flexDirection: 'column', gap: 4 },
  timeItem: { fontSize: 12, color: '#5A5550', fontFamily: "'Outfit',sans-serif" },
  timePrice: { fontSize: 20, fontWeight: 700, fontFamily: "'Outfit',sans-serif" },
  bizSection: { background: '#1E3328', borderRadius: 20, padding: '48px 52px', display: 'flex', gap: 52, alignItems: 'center', marginTop: 52 },
  bizLeft: { flex: 1 },
  bizRight: { flexShrink: 0, width: 280, position: 'relative' },
  bizImg: { width: '100%', height: 300, objectFit: 'cover', borderRadius: 16, display: 'block' },
  bizBadge: { position: 'absolute', bottom: -12, right: -12, background: '#C4673A', borderRadius: '50%', width: 80, height: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(196,103,58,0.4)' },
  bizBadgeNum: { color: 'white', fontSize: 20, fontWeight: 700, fontFamily: "'Outfit',sans-serif", lineHeight: 1 },
  bizBadgeSub: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontFamily: "'Outfit',sans-serif" },
  bizCombo: { display: 'flex', flexDirection: 'column', gap: 12, margin: '0 0 20px' },
  bizItem: { display: 'flex', alignItems: 'flex-start', gap: 10 },
  bizItemDot: { width: 8, height: 8, borderRadius: '50%', background: '#C4673A', flexShrink: 0, marginTop: 6 },
  bizItemTitle: { fontSize: 14, fontWeight: 600, color: 'white', fontFamily: "'Outfit',sans-serif" },
  bizItemDesc: { fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: "'Outfit',sans-serif", marginTop: 2 },
  bizPriceRow: { display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 20px', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)' },
  bizPriceLabel: { fontSize: 13, color: 'rgba(255,255,255,0.5)', fontFamily: "'Outfit',sans-serif" },
  bizPrice: { fontSize: 26, fontWeight: 700, color: '#E8A838', fontFamily: "'Outfit',sans-serif" },
  bizBtn: { background: '#C4673A', color: 'white', border: 'none', borderRadius: 12, padding: '13px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit',sans-serif", transition: 'background .2s' },
  loyalty: { marginTop: 52, padding: '48px', background: 'white', borderRadius: 20 },
  loyaltySub: { fontSize: 14, color: '#7A756E', fontFamily: "'Outfit',sans-serif", margin: '0 0 28px' },
  loyaltyGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 },
  loyaltyCard: { borderRadius: 16, padding: '24px 20px', textAlign: 'center' },
  loyaltyLevel: { fontSize: 16, fontWeight: 700, fontFamily: "'Cormorant Garamond',serif", margin: '0 0 6px' },
  loyaltyDiscount: { fontSize: 28, fontWeight: 700, fontFamily: "'Outfit',sans-serif", margin: '0 0 6px' },
  loyaltyFrom: { fontSize: 11, fontFamily: "'Outfit',sans-serif", margin: '0 0 6px' },
  loyaltyDesc: { fontSize: 11, fontFamily: "'Outfit',sans-serif", lineHeight: 1.4 },
  newsletter: { background: '#1E3328', borderRadius: 20, padding: '44px 48px', marginTop: 28, marginBottom: 8 },
};

export default PromoPage;
