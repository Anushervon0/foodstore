import React from 'react';
import { HeroSlider } from './Header.jsx';
import { ProductCard } from './ProductCard.jsx';
import { ArrowRight, IconNatural, IconSpeed, IconPrice, IconFresh, FoodIllustration } from './icons.jsx';
import { CATEGORIES as CATEGORIES_FALLBACK } from '../data/menu.js';
import { fetchProducts, fetchCategories } from '../api.js';

const SectionLabel = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: '#C4673A', fontFamily: "'Outfit',sans-serif", marginBottom: 10 }}>{children}</div>
);

const HomePage = ({ onCatalog, onAdd, onOpen, setPage }) => {
  const [menu, setMenu] = React.useState([]);
  const [categories, setCategories] = React.useState(CATEGORIES_FALLBACK);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const [products, cats] = await Promise.all([fetchProducts(), fetchCategories()]);
        if (cancelled) return;
        setMenu(products);
        if (cats && cats.length) setCategories(cats);
        setError(null);
      } catch (e) {
        if (cancelled) return;
        setError(e.message || 'Не удалось загрузить меню');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const popular = menu.filter(m => m.popular).slice(0, 4);

  return (
    <main style={{ background: '#F4F1EC' }}>
      <HeroSlider onCatalog={onCatalog} />

      {/* Categories */}
      <section style={hpS.section}>
        <div style={hpS.container}>
          <SectionLabel>Разделы меню</SectionLabel>
          <div style={hpS.sectionHead}>
            <h2 style={hpS.sectionTitle}>Наши категории</h2>
            <button style={hpS.linkBtn} onClick={onCatalog}>Весь каталог <ArrowRight size={15} /></button>
          </div>
          <div style={hpS.catGrid}>
            {categories.map(cat => (
              <div key={cat.id} style={{ ...hpS.catCard, background: cat.color }}
                onClick={onCatalog}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; }}
              >
                <FoodIllustration cat={cat.id} size={62} />
                <span style={hpS.catCardLabel}>{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular dishes */}
      <section style={{ ...hpS.section, background: 'white' }}>
        <div style={hpS.container}>
          <SectionLabel>Лидеры продаж</SectionLabel>
          <div style={hpS.sectionHead}>
            <h2 style={hpS.sectionTitle}>Популярные блюда</h2>
            <button style={hpS.linkBtn} onClick={onCatalog}>Смотреть все <ArrowRight size={15} /></button>
          </div>
          {error ? (
            <p style={{ color: '#9A8C7E', fontFamily: "'Outfit',sans-serif", fontSize: 14 }}>Не удалось загрузить блюда: {error}</p>
          ) : loading ? (
            <p style={{ color: '#9A8C7E', fontFamily: "'Outfit',sans-serif", fontSize: 14 }}>Загрузка меню…</p>
          ) : (
            <div style={hpS.dishGrid}>
              {popular.map(item => (
                <ProductCard key={item.id} item={item} onAdd={onAdd} onOpen={onOpen} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why us */}
      <section style={hpS.section}>
        <div style={hpS.container}>
          <SectionLabel>Наши принципы</SectionLabel>
          <h2 style={{ ...hpS.sectionTitle, textAlign: 'center', marginBottom: 48 }}>Почему выбирают нас</h2>
          <div style={hpS.featGrid}>
            {[
              { icon: <IconNatural size={52} />, title: 'Натуральные продукты', text: 'Свежие ингредиенты от местных фермеров. Никаких консервантов, усилителей вкуса и заморозки.' },
              { icon: <IconSpeed size={52} />, title: 'Быстро и удобно', text: 'Заказ онлайн в несколько кликов. Ваши блюда готовы к нужному времени — без очередей и ожидания.' },
              { icon: <IconPrice size={52} />, title: 'Доступные цены', text: 'Вкусная домашняя еда без переплат. Бизнес-ланч от 290 ₽, действуют регулярные акции.' },
              { icon: <IconFresh size={52} />, title: 'Каждый день свежее', text: 'Меню обновляется ежедневно. Только сезонные продукты — приготовленные в день подачи.' },
            ].map((f, i) => (
              <div key={i} style={hpS.featCard}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; }}
              >
                <div style={hpS.featIconWrap}>{f.icon}</div>
                <h3 style={hpS.featTitle}>{f.title}</h3>
                <p style={hpS.featText}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={hpS.statsStrip}>
        <div style={hpS.container}>
          <div style={hpS.statsGrid}>
            {[['19+', 'позиций в меню'], ['5 лет', 'на рынке'], ['4.8', 'средний рейтинг'], ['500+', 'гостей в день']].map(([num, lbl]) => (
              <div key={lbl} style={hpS.statItem}>
                <span style={hpS.statNum}>{num}</span>
                <span style={hpS.statLbl}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ ...hpS.section, background: '#1E3328', padding: '80px 0' }}>
        <div style={hpS.container}>
          <div style={hpS.ctaInner}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontFamily: "'Outfit',sans-serif", display: 'block', marginBottom: 12 }}>СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ</span>
              <h2 style={hpS.ctaTitle}>Бизнес-ланч с 12:00 до 15:00</h2>
              <p style={hpS.ctaSub}>Первое + второе + напиток — всего от <strong style={{ color: '#E8A838' }}>290 рублей</strong></p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
              <button style={hpS.ctaBtn}
                onClick={onCatalog}
                onMouseEnter={e => { e.currentTarget.style.background = '#A8552E'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#C4673A'; }}
              >Заказать сейчас</button>
              <button style={hpS.ctaBtnSec}
                onClick={() => setPage('delivery')}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >Условия доставки <ArrowRight size={14} /></button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const hpS = {
  section: { padding: '72px 0' },
  container: { maxWidth: 1240, margin: '0 auto', padding: '0 28px' },
  sectionHead: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 },
  sectionTitle: { fontSize: 'clamp(22px,3vw,32px)', fontFamily: "'Cormorant Garamond',serif", color: '#1A2B1E', margin: 0, fontWeight: 700 },
  linkBtn: { display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#C4673A', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit',sans-serif", padding: '6px 0', transition: 'gap .2s' },
  catGrid: { display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 16 },
  catCard: { borderRadius: 16, padding: '20px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'pointer', transition: 'transform .25s, box-shadow .25s', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  catCardLabel: { fontSize: 13, fontWeight: 600, color: '#1A2B1E', textAlign: 'center', fontFamily: "'Outfit',sans-serif" },
  dishGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 },
  featGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 },
  featCard: { background: 'white', borderRadius: 20, padding: '28px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', transition: 'transform .25s, box-shadow .25s', display: 'flex', flexDirection: 'column', gap: 10 },
  featIconWrap: { marginBottom: 4 },
  featTitle: { fontSize: 17, fontWeight: 600, color: '#1A2B1E', margin: 0, fontFamily: "'Cormorant Garamond',serif", letterSpacing: .3 },
  featText: { fontSize: 13, color: '#7A756E', lineHeight: 1.65, margin: 0, fontFamily: "'Outfit',sans-serif" },
  statsStrip: { background: '#2A3D30', padding: '48px 0' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 },
  statItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '0 20px', borderRight: '1px solid rgba(255,255,255,0.1)' },
  statNum: { fontSize: 'clamp(28px,3vw,42px)', fontWeight: 700, color: 'white', fontFamily: "'Cormorant Garamond',serif", letterSpacing: 1 },
  statLbl: { fontSize: 13, color: 'rgba(255,255,255,0.5)', fontFamily: "'Outfit',sans-serif" },
  ctaInner: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40 },
  ctaTitle: { fontSize: 'clamp(24px,3vw,38px)', fontFamily: "'Cormorant Garamond',serif", color: 'white', margin: '0 0 10px', fontWeight: 700 },
  ctaSub: { fontSize: 16, color: 'rgba(255,255,255,0.65)', margin: 0, fontFamily: "'Outfit',sans-serif" },
  ctaBtn: { background: '#C4673A', color: 'white', border: 'none', borderRadius: 12, padding: '14px 32px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit',sans-serif", whiteSpace: 'nowrap', transition: 'background .2s', letterSpacing: .3 },
  ctaBtnSec: { display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: "'Outfit',sans-serif", transition: 'background .2s', letterSpacing: .3 },
};

export default HomePage;
