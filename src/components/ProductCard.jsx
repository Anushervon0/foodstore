import React from "react";
import {StarIcon, PlusIcon, MinusIcon, CloseIcon, FoodIllustration} from "./icons.jsx";
import {CATEGORIES} from "../data/menu.js";

// ===== PRODUCT CARD =====
export const ProductCard = ({item, onAdd, onOpen}) => {
   const [added, setAdded] = React.useState(false);
   const [imgErr, setImgErr] = React.useState(false);
   const cat = CATEGORIES.find(c => c.id === item.cat) || {};

   const handleAdd = e => {
      e.stopPropagation();
      onAdd(item);
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
   };

   return (
      <div
         style={pcS.card}
         onClick={() => onOpen(item)}
         onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)";
         }}
         onMouseLeave={e => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
         }}>
         <div
            className="max-md:!h-[160px]"
            style={{...pcS.imgWrap, background: cat.color || "#F0EDE8"}}>
            {!imgErr && item.photo ? (
               <img src={item.photo} alt={item.name} style={pcS.img} onError={() => setImgErr(true)} />
            ) : (
               <FoodIllustration cat={item.cat} size={80} />
            )}
            {item.badge && <span style={pcS.badge}>{item.badge}</span>}
         </div>
         <div style={pcS.body}>
            <div style={pcS.catLabel}>{cat.label}</div>
            <h3 style={pcS.name}>{item.name}</h3>
            <p style={pcS.desc}>{item.desc}</p>
            <div style={pcS.meta}>
               <span style={pcS.metaItem}>{item.weight}</span>
               <span style={pcS.metaItem}>{item.kcal} ккал</span>
            </div>
            <div style={pcS.rating}>
               <div style={{display: "flex", gap: 2}}>
                  {[1, 2, 3, 4, 5].map(i => (
                     <StarIcon key={i} filled={i <= Math.round(item.rating)} size={11} />
                  ))}
               </div>
               <span style={pcS.ratingNum}>{item.rating}</span>
               <span style={pcS.ratingCount}>({item.reviews})</span>
            </div>
            <div style={pcS.footer}>
               <span style={pcS.price}>{item.price} ₽</span>
               <button
                  style={{...pcS.addBtn, background: added ? "#1E3328" : "#C4673A"}}
                  onClick={handleAdd}
                  onMouseEnter={e => {
                     if (!added) e.currentTarget.style.background = "#A8552E";
                  }}
                  onMouseLeave={e => {
                     e.currentTarget.style.background = added ? "#1E3328" : "#C4673A";
                  }}>
                  {added ? "✓" : <PlusIcon size={14} />}
               </button>
            </div>
         </div>
      </div>
   );
};

const pcS = {
   card: {
      background: "white",
      borderRadius: 20,
      overflow: "hidden",
      cursor: "pointer",
      transition: "transform .25s, box-shadow .25s",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "column",
   },
   imgWrap: {height: 180, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden"},
   img: {width: "100%", height: "100%", objectFit: "cover", display: "block"},
   badge: {
      position: "absolute",
      top: 10,
      left: 10,
      background: "#C4673A",
      color: "white",
      fontSize: 10,
      fontWeight: 700,
      padding: "3px 8px",
      borderRadius: 20,
      fontFamily: "'Outfit',sans-serif",
      letterSpacing: 0.5,
   },
   body: {padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 6, flex: 1},
   catLabel: {fontSize: 10, fontWeight: 700, color: "#C4673A", textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "'Outfit',sans-serif"},
   name: {fontSize: 16, fontWeight: 700, color: "#1A2B1E", margin: 0, fontFamily: "'Cormorant Garamond',serif", lineHeight: 1.25},
   desc: {
      fontSize: 12,
      color: "#9A8C7E",
      lineHeight: 1.55,
      margin: 0,
      fontFamily: "'Outfit',sans-serif",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
   },
   meta: {display: "flex", gap: 8},
   metaItem: {fontSize: 11, color: "#B0A898", fontFamily: "'Outfit',sans-serif", background: "#F4F1EC", padding: "2px 7px", borderRadius: 6},
   rating: {display: "flex", alignItems: "center", gap: 4},
   ratingNum: {fontSize: 12, fontWeight: 700, color: "#1A2B1E", fontFamily: "'Outfit',sans-serif"},
   ratingCount: {fontSize: 11, color: "#B0A898", fontFamily: "'Outfit',sans-serif"},
   footer: {display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 8},
   price: {fontSize: 20, fontWeight: 700, color: "#1A2B1E", fontFamily: "'Outfit',sans-serif"},
   addBtn: {
      width: 38,
      height: 38,
      border: "none",
      borderRadius: 10,
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "background .2s",
      flexShrink: 0,
   },
};

// ===== PRODUCT MODAL =====
export const ProductModal = ({item, onClose, onAdd}) => {
   const [qty, setQty] = React.useState(1);
   const [added, setAdded] = React.useState(false);
   const [imgErr, setImgErr] = React.useState(false);
   const cat = CATEGORIES.find(c => c.id === item.cat) || {};

   React.useEffect(() => {
      const esc = e => e.key === "Escape" && onClose();
      document.addEventListener("keydown", esc);
      document.body.style.overflow = "hidden";
      return () => {
         document.removeEventListener("keydown", esc);
         document.body.style.overflow = "";
      };
   }, [onClose]);

   const handleAdd = () => {
      onAdd({...item, qty});
      setAdded(true);
      setTimeout(() => {
         setAdded(false);
         onClose();
      }, 900);
   };

   return (
      <div
         className="max-md:!p-3 max-md:!items-end"
         style={mdS.overlay} onClick={onClose}>
         <div
            className="max-md:!max-w-full max-md:!max-h-[92vh] max-md:!rounded-t-[20px] max-md:!rounded-b-none"
            style={mdS.modal} onClick={e => e.stopPropagation()}>
            <button
               style={mdS.closeBtn}
               onClick={onClose}
               onMouseEnter={e => (e.currentTarget.style.background = "#F0EDE8")}
               onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.95)")}>
               <CloseIcon size={16} />
            </button>

            <div
               className="max-md:!h-[200px]"
               style={mdS.imgArea}>
               {!imgErr && item.photo ? (
                  <img src={item.photo} alt={item.name} style={mdS.img} onError={() => setImgErr(true)} />
               ) : (
                  <div style={{...mdS.imgFallback, background: cat.color || "#F0EDE8"}}>
                     <FoodIllustration cat={item.cat} size={140} />
                  </div>
               )}
               <div style={mdS.imgGrad} />
               {item.badge && <span style={pcS.badge}>{item.badge}</span>}
            </div>

            <div
               className="max-md:!p-5"
               style={mdS.content}>
               <div style={{display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap"}}>
                  <span style={pcS.catLabel}>{cat.label}</span>
                  <span style={{color: "#D0C8C0", fontSize: 11}}>·</span>
                  <div style={{display: "flex", alignItems: "center", gap: 4}}>
                     <div style={{display: "flex", gap: 1}}>
                        {[1, 2, 3, 4, 5].map(i => (
                           <StarIcon key={i} filled={i <= Math.round(item.rating)} size={11} />
                        ))}
                     </div>
                     <span style={{fontSize: 12, fontWeight: 700, color: "#1A2B1E", fontFamily: "'Outfit',sans-serif"}}>{item.rating}</span>
                     <span style={{fontSize: 11, color: "#9A8C7E", fontFamily: "'Outfit',sans-serif"}}>({item.reviews} отзывов)</span>
                  </div>
               </div>

               <h2 className="max-md:!text-[22px]" style={mdS.title}>{item.name}</h2>
               <p className="max-md:!text-[13px]" style={mdS.desc}>{item.desc}</p>

               <div style={mdS.infoRow}>
                  {[
                     ["Вес", item.weight],
                     ["Калории", `${item.kcal} ккал`],
                     ["Цена", `${item.price} ₽`],
                  ].map(([l, v]) => (
                     <div key={l} style={mdS.infoItem}>
                        <span style={mdS.infoLabel}>{l}</span>
                        <span style={{...mdS.infoVal, ...(l === "Цена" ? {color: "#C4673A"} : {})}}>{v}</span>
                     </div>
                  ))}
               </div>

               <div
                  className="max-md:!gap-2"
                  style={mdS.actions}>
                  <div style={mdS.qtyRow}>
                     <button style={mdS.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>
                        <MinusIcon size={14} />
                     </button>
                     <span style={mdS.qtyNum}>{qty}</span>
                     <button style={mdS.qtyBtn} onClick={() => setQty(q => q + 1)}>
                        <PlusIcon size={14} />
                     </button>
                  </div>
                  <button
                     className="max-md:!text-[14px] max-md:!py-3"
                     style={{...mdS.addBtn, background: added ? "#1E3328" : "#C4673A"}}
                     onClick={handleAdd}
                     onMouseEnter={e => {
                        if (!added) e.currentTarget.style.background = "#A8552E";
                     }}
                     onMouseLeave={e => {
                        e.currentTarget.style.background = added ? "#1E3328" : "#C4673A";
                     }}>
                     {added ? "Добавлено!" : `В корзину · ${item.price * qty} ₽`}
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

const mdS = {
   overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(15,22,18,0.6)",
      backdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 200,
      padding: 24,
   },
   modal: {
      background: "white",
      borderRadius: 24,
      width: "100%",
      maxWidth: 520,
      overflow: "hidden",
      position: "relative",
      boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
      maxHeight: "90vh",
      overflowY: "auto",
   },
   closeBtn: {
      position: "absolute",
      top: 14,
      right: 14,
      background: "rgba(255,255,255,0.95)",
      border: "none",
      borderRadius: 50,
      width: 36,
      height: 36,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: 1,
      boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
      transition: "background .2s",
   },
   imgArea: {height: 260, position: "relative", overflow: "hidden"},
   img: {width: "100%", height: "100%", objectFit: "cover", display: "block"},
   imgFallback: {width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"},
   imgGrad: {position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(255,255,255,0.1) 0%, transparent 50%)"},
   content: {padding: "22px 28px 28px", display: "flex", flexDirection: "column", gap: 10},
   title: {margin: "0 0 4px", fontSize: 28, fontFamily: "'Cormorant Garamond',serif", color: "#1A2B1E", lineHeight: 1.2, fontWeight: 700},
   desc: {margin: 0, fontSize: 14, color: "#7A756E", lineHeight: 1.7, fontFamily: "'Outfit',sans-serif"},
   infoRow: {display: "flex", gap: 0, padding: "14px 0", borderTop: "1px solid #F0EDE8", borderBottom: "1px solid #F0EDE8", margin: "4px 0"},
   infoItem: {flex: 1, display: "flex", flexDirection: "column", gap: 3, paddingRight: 16},
   infoLabel: {fontSize: 10, color: "#9A8C7E", textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "'Outfit',sans-serif", fontWeight: 700},
   infoVal: {fontSize: 17, fontWeight: 700, color: "#1A2B1E", fontFamily: "'Outfit',sans-serif"},
   actions: {display: "flex", gap: 12, alignItems: "center", marginTop: 4},
   qtyRow: {display: "flex", alignItems: "center", background: "#F4F1EC", borderRadius: 12, padding: "3px"},
   qtyBtn: {
      background: "none",
      border: "none",
      width: 38,
      height: 38,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "#1A2B1E",
      borderRadius: 10,
   },
   qtyNum: {width: 34, textAlign: "center", fontSize: 16, fontWeight: 700, fontFamily: "'Outfit',sans-serif", color: "#1A2B1E"},
   addBtn: {
      flex: 1,
      border: "none",
      borderRadius: 12,
      padding: "13px",
      color: "white",
      fontSize: 15,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "'Outfit',sans-serif",
      transition: "background .2s",
      letterSpacing: 0.3,
   },
};
