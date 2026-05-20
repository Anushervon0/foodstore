import React from "react";
import {LogoMark, MapPinIcon, ClockIcon, PhoneIcon} from "./icons.jsx";
import {CATEGORIES} from "../data/menu.js";

export const Footer = ({setPage}) => (
   <footer style={ftS.footer} className="max-md:!pt-10">
      <div style={ftS.container} className="max-md:!px-4">
         <div
            className="max-md:!grid-cols-1 max-md:!gap-8 max-md:!pb-8"
            style={ftS.grid}>
            <div>
               <div style={ftS.brand} onClick={() => setPage("home")}>
                  <LogoMark />
                  <div>
                     <div style={ftS.brandName}>SULTAN</div>
                     <div style={ftS.brandSub}>GRIL HOUSE</div>
                  </div>
               </div>
               <p style={ftS.about}>Домашняя кухня в центре города. Готовим с любовью каждый день из свежих сезонных продуктов.</p>
               <div style={ftS.socials}>
                  {["VK", "TG"].map(s => (
                     <div key={s} style={ftS.socialBtn}>
                        {s}
                     </div>
                  ))}
               </div>
            </div>

            <div>
               <div style={ftS.colTitle}>Меню</div>
               <div style={ftS.links}>
                  {CATEGORIES.map(c => (
                     <span
                        key={c.id}
                        style={ftS.link}
                        onClick={() => setPage("catalog")}
                        onMouseEnter={e => (e.currentTarget.style.color = "white")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
                        {c.label}
                     </span>
                  ))}
               </div>
            </div>

            <div>
               <div style={ftS.colTitle}>Информация</div>
               <div style={ftS.links}>
                  {[
                     ["promo", "Акции"],
                     ["delivery", "Доставка и оплата"],
                  ].map(([p, label]) => (
                     <span
                        key={p}
                        style={ftS.link}
                        onClick={() => setPage(p)}
                        onMouseEnter={e => (e.currentTarget.style.color = "white")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
                        {label}
                     </span>
                  ))}
               </div>
            </div>

            <div>
               <div style={ftS.colTitle}>Контакты</div>
               <div style={ftS.contacts}>
                  <a href="tel:+78001234567" style={ftS.contact}>
                     <PhoneIcon size={14} />
                     <span>8 800 123-45-67</span>
                  </a>
                  <div style={ftS.contact}>
                     <MapPinIcon size={14} />
                     <span>ул. Германа Титова, 6</span>
                  </div>
                  <div style={ftS.contact}>
                     <ClockIcon size={14} />
                     <span>Пн–Пт 8:00–20:00</span>
                  </div>
                  <div style={ftS.contact}>
                     <ClockIcon size={14} />
                     <span>Сб 9:00–18:00</span>
                  </div>
               </div>
            </div>
         </div>

         <div
            className="max-md:!flex-col max-md:!items-start max-md:!gap-2 max-md:!text-[11px]"
            style={ftS.bottom}>
            <span>© 2026 СИТНЫЙ. Все права защищены.</span>
            <span>Сделано с ❤️ для наших гостей</span>
         </div>
      </div>
   </footer>
);

const ftS = {
   footer: {background: "#0F1A12", padding: "60px 0 0"},
   container: {maxWidth: 1240, margin: "0 auto", padding: "0 28px"},
   grid: {display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 48, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.07)"},
   brand: {display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 16},
   brandName: {color: "white", fontSize: 18, fontWeight: 700, fontFamily: "'Cormorant Garamond',serif", letterSpacing: 3},
   brandSub: {color: "rgba(255,255,255,0.3)", fontSize: 9, letterSpacing: 3, textTransform: "uppercase"},
   about: {color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.7, fontFamily: "'Outfit',sans-serif", margin: "0 0 20px"},
   socials: {display: "flex", gap: 8},
   socialBtn: {
      width: 36,
      height: 36,
      borderRadius: 10,
      background: "rgba(255,255,255,0.07)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "rgba(255,255,255,0.5)",
      fontSize: 12,
      fontWeight: 700,
      fontFamily: "'Outfit',sans-serif",
      cursor: "pointer",
   },
   colTitle: {
      color: "white",
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: 1.5,
      textTransform: "uppercase",
      fontFamily: "'Outfit',sans-serif",
      marginBottom: 16,
   },
   links: {display: "flex", flexDirection: "column", gap: 10},
   link: {color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "'Outfit',sans-serif", cursor: "pointer", transition: "color .2s"},
   contacts: {display: "flex", flexDirection: "column", gap: 10},
   contact: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      color: "rgba(255,255,255,0.5)",
      fontSize: 13,
      fontFamily: "'Outfit',sans-serif",
      textDecoration: "none",
   },
   bottom: {
      display: "flex",
      justifyContent: "space-between",
      padding: "20px 0",
      color: "rgba(255,255,255,0.25)",
      fontSize: 12,
      fontFamily: "'Outfit',sans-serif",
   },
};
