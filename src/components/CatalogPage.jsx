import React from 'react';
import { ProductCard } from './ProductCard.jsx';
import { CloseIcon } from './icons.jsx';
import { CATEGORIES as CATEGORIES_FALLBACK } from '../data/menu.js';
import { fetchProducts, fetchCategories } from '../api.js';

export const plural = (n, [one, few, many]) => {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if ([2, 3, 4].includes(m10) && ![12, 13, 14].includes(m100)) return few;
  return many;
};

const CatalogPage = ({ onAdd, onOpen }) => {
  const [menu, setMenu] = React.useState([]);
  const [categories, setCategories] = React.useState(CATEGORIES_FALLBACK);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [activeCat, setActiveCat] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState('popular');

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

  const filtered = React.useMemo(() => {
    let list = menu.filter(item => {
      const matchCat = activeCat === 'all' || item.cat === activeCat;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
    if (sort === 'price_asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'popular') list = [...list].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    return list;
  }, [menu, activeCat, search, sort]);

  return (
    <main style={{ background: '#F4F1EC', minHeight: '100vh', paddingBottom: 80 }}>
      <div style={catS.hero}>
        <div style={catS.container}>
          <div style={catS.heroInner}>
            <div>
              <span style={catS.heroLabel}>Наше меню</span>
              <h1 style={catS.heroTitle}>Каталог блюд</h1>
              <p style={catS.heroSub}>Свежее ежедневное меню · {menu.length} позиций</p>
            </div>
            <div style={catS.searchWrap}>
              <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input style={catS.searchInput} placeholder="Найти блюдо..." value={search} onChange={e => setSearch(e.target.value)} />
              {search && <button style={catS.clearBtn} onClick={() => setSearch('')}><CloseIcon size={14} /></button>}
            </div>
          </div>
        </div>
      </div>

      <div style={catS.container}>
        <div style={catS.filtersRow}>
          <div style={catS.tabs}>
            <button style={{ ...catS.tab, ...(activeCat === 'all' ? catS.tabActive : {}) }} onClick={() => setActiveCat('all')}>
              Все <span style={{ ...catS.tabCount, ...(activeCat === 'all' ? { background: 'rgba(255,255,255,0.3)' } : {}) }}>{menu.length}</span>
            </button>
            {categories.map(cat => {
              const cnt = menu.filter(m => m.cat === cat.id).length;
              return (
                <button key={cat.id} style={{ ...catS.tab, ...(activeCat === cat.id ? catS.tabActive : {}) }} onClick={() => setActiveCat(cat.id)}>
                  {cat.label} <span style={{ ...catS.tabCount, ...(activeCat === cat.id ? { background: 'rgba(255,255,255,0.3)' } : {}) }}>{cnt}</span>
                </button>
              );
            })}
          </div>
          <div style={catS.sortWrap}>
            <span style={catS.sortLabel}>Сортировка:</span>
            <select style={catS.sortSelect} value={sort} onChange={e => setSort(e.target.value)}>
              <option value="popular">Популярные</option>
              <option value="rating">По рейтингу</option>
              <option value="price_asc">Сначала дешевле</option>
              <option value="price_desc">Сначала дороже</option>
            </select>
          </div>
        </div>

        {error ? (
          <div style={catS.empty}>
            <div style={catS.emptyIco}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C0B8B0" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </div>
            <h3 style={catS.emptyTitle}>Не удалось загрузить меню</h3>
            <p style={catS.emptyText}>{error}</p>
          </div>
        ) : loading ? (
          <div style={catS.empty}>
            <h3 style={catS.emptyTitle}>Загрузка меню…</h3>
          </div>
        ) : filtered.length === 0 ? (
          <div style={catS.empty}>
            <div style={catS.emptyIco}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C0B8B0" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </div>
            <h3 style={catS.emptyTitle}>Ничего не найдено</h3>
            <p style={catS.emptyText}>Попробуйте изменить фильтры или поисковый запрос</p>
            <button style={catS.emptyBtn} onClick={() => { setSearch(''); setActiveCat('all'); }}>Сбросить фильтры</button>
          </div>
        ) : (
          <>
            <div style={catS.resultRow}>
              <span style={catS.resultCount}>{filtered.length} {plural(filtered.length, ['блюдо', 'блюда', 'блюд'])}</span>
            </div>
            <div style={catS.grid}>
              {filtered.map(item => <ProductCard key={item.id} item={item} onAdd={onAdd} onOpen={onOpen} />)}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

const catS = {
  hero: { background: '#1E3328', padding: '52px 0 40px' },
  container: { maxWidth: 1240, margin: '0 auto', padding: '0 28px' },
  heroInner: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' },
  heroLabel: { fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: "'Outfit',sans-serif", display: 'block', marginBottom: 10 },
  heroTitle: { fontSize: 'clamp(28px,4vw,46px)', fontFamily: "'Cormorant Garamond',serif", color: 'white', margin: '0 0 8px', fontWeight: 700 },
  heroSub: { fontSize: 15, color: 'rgba(255,255,255,0.5)', margin: 0, fontFamily: "'Outfit',sans-serif" },
  searchWrap: { position: 'relative', width: 320, flexShrink: 0 },
  searchInput: { width: '100%', padding: '13px 40px 13px 42px', borderRadius: 12, border: 'none', fontSize: 14, fontFamily: "'Outfit',sans-serif", outline: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', boxSizing: 'border-box', backdropFilter: 'blur(8px)', caretColor: '#C4673A', transition: 'background .2s' },
  clearBtn: { position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', display: 'flex' },
  filtersRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 0 20px', gap: 20, flexWrap: 'wrap' },
  tabs: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  tab: { background: 'white', border: 'none', borderRadius: 20, padding: '8px 16px', fontSize: 13, fontWeight: 600, color: '#7A756E', cursor: 'pointer', fontFamily: "'Outfit',sans-serif", display: 'flex', alignItems: 'center', gap: 6, transition: 'all .2s', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', whiteSpace: 'nowrap' },
  tabActive: { background: '#C4673A', color: 'white', boxShadow: '0 4px 14px rgba(196,103,58,0.3)' },
  tabCount: { background: 'rgba(0,0,0,0.06)', borderRadius: 20, padding: '1px 7px', fontSize: 11, fontWeight: 700 },
  sortWrap: { display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 },
  sortLabel: { fontSize: 13, color: '#9A8C7E', fontFamily: "'Outfit',sans-serif", whiteSpace: 'nowrap' },
  sortSelect: { border: '1px solid #E5E0D8', borderRadius: 10, padding: '8px 12px', fontSize: 13, fontFamily: "'Outfit',sans-serif", color: '#1A2B1E', background: 'white', cursor: 'pointer', outline: 'none' },
  resultRow: { marginBottom: 20 },
  resultCount: { fontSize: 13, color: '#9A8C7E', fontFamily: "'Outfit',sans-serif" },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 },
  empty: { textAlign: 'center', padding: '80px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 },
  emptyIco: { width: 72, height: 72, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' },
  emptyTitle: { fontSize: 22, fontFamily: "'Cormorant Garamond',serif", color: '#1A2B1E', margin: 0 },
  emptyText: { fontSize: 14, color: '#9A8C7E', fontFamily: "'Outfit',sans-serif", margin: 0 },
  emptyBtn: { background: '#C4673A', color: 'white', border: 'none', borderRadius: 10, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit',sans-serif", marginTop: 8 },
};

export default CatalogPage;
