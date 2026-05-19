import React from "react";
import {PhoneIcon, CartIcon, MapPinIcon, CheckIcon, ChevronLeft, ChevronRight, LogoMark} from "./icons.jsx";

// ===== TOAST =====
export const ToastContainer = ({toasts}) => (
   <div
      style={{
         position: "fixed",
         bottom: 28,
         left: "50%",
         transform: "translateX(-50%)",
         zIndex: 9999,
         display: "flex",
         flexDirection: "column",
         gap: 10,
         alignItems: "center",
         pointerEvents: "none",
      }}>
      {toasts.map(t => (
         <div
            key={t.id}
            style={{
               background: "#1E3328",
               color: "white",
               borderRadius: 14,
               padding: "12px 20px",
               display: "flex",
               alignItems: "center",
               gap: 10,
               fontFamily: "'Outfit',sans-serif",
               fontSize: 14,
               fontWeight: 500,
               boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
               animation: "toastIn .3s cubic-bezier(.34,1.56,.64,1)",
               whiteSpace: "nowrap",
            }}>
            <span
               style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "#C4673A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
               }}>
               <CheckIcon size={13} />
            </span>
            <span>
               <strong>{t.name}</strong> добавлен в корзину
            </span>
         </div>
      ))}
   </div>
);

// ===== HEADER =====
export const Header = ({page, setPage, cartCount, cartTotal}) => {
   const navItems = [
      {id: "home", label: "Главная"},
      {id: "catalog", label: "Каталог"},
      {id: "promo", label: "Акции"},
      {id: "delivery", label: "Доставка и оплата"},
   ];

   return (
      <header style={hdrS.header}>
         <div style={hdrS.inner}>
            <div style={hdrS.logo} onClick={() => setPage("home")}>
               <LogoMark />
               <div>
                  <div style={hdrS.logoName}>SULTAN</div>
                  <div style={hdrS.logoSub}>GRIL HOUSE</div>
               </div>
            </div>
            <nav style={hdrS.nav}>
               {navItems.map(({id, label}) => (
                  <button
                     key={id}
                     onClick={() => setPage(id)}
                     style={{...hdrS.navBtn, ...(page === id ? hdrS.navActive : {})}}
                     onMouseEnter={e => {
                        if (page !== id) e.currentTarget.style.color = "white";
                     }}
                     onMouseLeave={e => {
                        if (page !== id) e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                     }}>
                     {label}
                  </button>
               ))}
            </nav>
            <div style={hdrS.right}>
               <a href="tel:+78001234567" style={hdrS.phone}>
                  <PhoneIcon size={15} />
                  <span>8 800 123-45-67</span>
               </a>
               <button
                  style={hdrS.cartBtn}
                  onClick={() => setPage("cart")}
                  onMouseEnter={e => (e.currentTarget.style.background = "#A8552E")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#C4673A")}>
                  <CartIcon count={cartCount} />
                  <span>Корзина</span>
                  {cartTotal > 0 && <span style={hdrS.cartTotal}>{cartTotal} ₽</span>}
               </button>
            </div>
         </div>
      </header>
   );
};

const hdrS = {
   header: {background: "#1E3328", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 24px rgba(0,0,0,0.22)"},
   inner: {maxWidth: 1240, margin: "0 auto", padding: "0 28px", height: 68, display: "flex", alignItems: "center", gap: 28},
   logo: {display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0},
   logoName: {color: "white", fontSize: 20, fontWeight: 700, fontFamily: "'Cormorant Garamond',serif", letterSpacing: 3},
   logoSub: {color: "rgba(255,255,255,0.4)", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", marginTop: -1},
   nav: {display: "flex", gap: 2, flex: 1},
   navBtn: {
      background: "none",
      border: "none",
      color: "rgba(255,255,255,0.6)",
      fontSize: 14,
      fontWeight: 500,
      padding: "8px 14px",
      borderRadius: 8,
      cursor: "pointer",
      fontFamily: "'Outfit',sans-serif",
      transition: "color .2s, background .2s",
      letterSpacing: 0.3,
   },
   navActive: {color: "white", background: "rgba(255,255,255,0.1)"},
   right: {display: "flex", alignItems: "center", gap: 18, flexShrink: 0},
   phone: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      color: "rgba(255,255,255,0.6)",
      textDecoration: "none",
      fontSize: 13,
      fontFamily: "'Outfit',sans-serif",
      letterSpacing: 0.3,
   },
   cartBtn: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "#C4673A",
      color: "white",
      border: "none",
      borderRadius: 10,
      padding: "9px 18px",
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 600,
      fontFamily: "'Outfit',sans-serif",
      transition: "background .2s",
      letterSpacing: 0.3,
   },
   cartTotal: {background: "rgba(255,255,255,0.2)", borderRadius: 6, padding: "2px 7px", fontSize: 12, fontWeight: 700},
};

// ===== HERO SLIDER =====
const slides = [
   {
      id: 1,
      tag: "Бизнес-ланч",
      title: "Сытный обед\nот 290 рублей",
      sub: "Первое, второе и напиток — каждый день с 12:00 до 15:00",
      cta: "В каталог",
      bg: "#1E3328",
      accent: "#C4673A",
      textCol: "white",
      subCol: "rgba(255,255,255,0.65)",
      photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&h=500&fit=crop&q=85",
   },
   {
      id: 2,
      tag: "Акция месяца",
      title: "Салаты со скидкой\n15% весь май",
      sub: "Лёгкий и свежий обед — по выгодной цене каждый день",
      cta: "Смотреть салаты",
      bg: "#2A3D30",
      accent: "#E8A838",
      textCol: "white",
      subCol: "rgba(255,255,255,0.65)",
      photo: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&h=500&fit=crop&q=85",
   },
   {
      id: 3,
      tag: "Свежее каждый день",
      title: "Домашняя кухня\nв центре города",
      sub: "Готовим из натуральных продуктов по традиционным рецептам",
      cta: "Узнать больше",
      bg: "#2D1F14",
      accent: "#D4A060",
      textCol: "white",
      subCol: "rgba(255,255,255,0.65)",
      photo: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=700&h=500&fit=crop&q=85",
   },
];

export const HeroSlider = ({onCatalog}) => {
   const [cur, setCur] = React.useState(0);
   const [fading, setFading] = React.useState(false);

   React.useEffect(() => {
      const t = setInterval(() => go(c => (c + 1) % slides.length), 5500);
      return () => clearInterval(t);
   }, []);

   const go = idxOrFn => {
      setFading(true);
      setTimeout(() => {
         setCur(idxOrFn);
         setFading(false);
      }, 350);
   };

   const prev = () => go(c => (c - 1 + slides.length) % slides.length);
   const next = () => go(c => (c + 1) % slides.length);
   const s = slides[cur];

   return (
      <div style={{...slS.wrap, background: s.bg}}>
         <div style={{...slS.content, opacity: fading ? 0 : 1, transition: "opacity .35s ease"}}>
            <div style={slS.inner}>
               <div style={slS.textCol}>
                  <span style={{...slS.tag, background: s.accent}}>{s.tag}</span>
                  <h1 style={{...slS.title, color: s.textCol}}>
                     {s.title.split("\n").map((l, i) => (
                        <span key={i}>
                           {l}
                           {i === 0 && <br />}
                        </span>
                     ))}
                  </h1>
                  <p style={{...slS.sub, color: s.subCol}}>{s.sub}</p>
                  <button
                     style={{...slS.cta, background: s.accent}}
                     onMouseEnter={e => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";
                     }}
                     onMouseLeave={e => {
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = "none";
                     }}
                     onClick={onCatalog}>
                     {s.cta}
                  </button>
               </div>
               <div style={slS.photoCol}>
                  <div style={slS.photoWrap}>
                     <img
                        src={s.photo}
                        alt=""
                        style={slS.photo}
                        onError={e => {
                           e.target.style.display = "none";
                        }}
                     />
                     <div style={{...slS.photoOverlay, background: `radial-gradient(circle at left, ${s.bg}, transparent 70%)`}} />
                  </div>
               </div>
            </div>
         </div>
         <button style={{...slS.arrow, left: 20}} onClick={prev}>
            <ChevronLeft />
         </button>
         <button style={{...slS.arrow, right: 20}} onClick={next}>
            <ChevronRight />
         </button>
         <div style={slS.dots}>
            {slides.map((_, i) => (
               <button key={i} style={{...slS.dot, ...(i === cur ? slS.dotActive : {})}} onClick={() => go(i)} />
            ))}
         </div>
      </div>
   );
};

const slS = {
   wrap: {position: "relative", overflow: "hidden", minHeight: 480},
   content: {position: "relative", zIndex: 1},
   inner: {maxWidth: 1240, margin: "0 auto", padding: "80px 28px", display: "flex", alignItems: "center", gap: 40, minHeight: 480},
   textCol: {flex: 1, zIndex: 2, position: "relative"},
   tag: {
      display: "inline-block",
      color: "white",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 2,
      textTransform: "uppercase",
      padding: "5px 12px",
      borderRadius: 20,
      marginBottom: 20,
      fontFamily: "'Outfit',sans-serif",
   },
   title: {fontSize: "clamp(32px,4vw,56px)", fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, margin: "0 0 16px", lineHeight: 1.15},
   sub: {fontSize: 16, lineHeight: 1.6, margin: "0 0 32px", fontFamily: "'Outfit',sans-serif"},
   cta: {
      border: "none",
      color: "white",
      borderRadius: 14,
      padding: "16px 36px",
      fontSize: 16,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Outfit',sans-serif",
      transition: "transform .2s, box-shadow .2s",
      letterSpacing: 0.5,
   },
   photoCol: {flex: 1, display: "flex", justifyContent: "flex-end"},
   photoWrap: {position: "relative", width: "100%", maxWidth: 520, height: 380, borderRadius: 24, overflow: "hidden"},
   photo: {width: "100%", height: "100%", objectFit: "cover", display: "block"},
   photoOverlay: {position: "absolute", inset: 0},
   arrow: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgba(255,255,255,0.15)",
      border: "none",
      borderRadius: "50%",
      width: 42,
      height: 42,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "white",
      zIndex: 2,
      backdropFilter: "blur(8px)",
      transition: "background .2s",
   },
   dots: {position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 2},
   dot: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.35)",
      border: "none",
      cursor: "pointer",
      padding: 0,
      transition: "all .2s",
   },
   dotActive: {background: "white", width: 24, borderRadius: 4},
};
