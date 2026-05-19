import React from "react";
import {MapPinIcon} from "./icons.jsx";

const DeliveryPage = () => {
   const [openFaq, setOpenFaq] = React.useState(null);

   const faqs = [
      {q: "Есть ли минимальная сумма заказа?", a: "Минимальная сумма заказа на доставку — 500 рублей. При самовывозе ограничений нет."},
      {
         q: "Как долго ждать доставку?",
         a: "Среднее время доставки — 45–60 минут в зависимости от загруженности и удалённости адреса. Курьер уточнит точное время при звонке.",
      },
      {
         q: "В каком радиусе работает доставка?",
         a: "Мы доставляем в радиусе 10 км от нашей столовой. Для более дальних адресов — уточняйте по телефону.",
      },
      {q: "Как оплатить заказ?", a: "Принимаем наличные и карту курьеру, а также онлайн-оплату через СБП или банковскую карту."},
      {q: "Можно ли изменить или отменить заказ?", a: "Да, в течение 10 минут после оформления. Позвоните нам по номеру 8 800 123-45-67."},
      {q: "Как упакованы блюда?", a: "Все блюда упакованы в экологичную посуду, супы — в термоконтейнеры. Горячее доставляем в термосумках."},
   ];

   const payMethods = [
      {
         icon: (
            <svg
               width="26"
               height="26"
               viewBox="0 0 24 24"
               fill="none"
               stroke="#C4673A"
               strokeWidth="1.8"
               strokeLinecap="round"
               strokeLinejoin="round">
               <rect x="1" y="4" width="22" height="16" rx="3" />
               <line x1="1" y1="10" x2="23" y2="10" />
               <line x1="5" y1="15" x2="9" y2="15" />
               <line x1="11" y1="15" x2="13" y2="15" />
            </svg>
         ),
         label: "Банковская карта",
         desc: "Visa, Mastercard, МИР — онлайн или курьеру",
      },
      {
         icon: (
            <svg
               width="26"
               height="26"
               viewBox="0 0 24 24"
               fill="none"
               stroke="#C4673A"
               strokeWidth="1.8"
               strokeLinecap="round"
               strokeLinejoin="round">
               <rect x="5" y="2" width="14" height="20" rx="3" />
               <path d="M12 6 L10 11 L13 11 L11 18" strokeWidth="1.8" />
            </svg>
         ),
         label: "СБП",
         desc: "Быстрые переводы по номеру телефона",
      },
      {
         icon: (
            <svg
               width="26"
               height="26"
               viewBox="0 0 24 24"
               fill="none"
               stroke="#C4673A"
               strokeWidth="1.8"
               strokeLinecap="round"
               strokeLinejoin="round">
               <rect x="2" y="7" width="20" height="13" rx="2" />
               <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
               <circle cx="12" cy="13" r="2" />
               <line x1="12" y1="15" x2="12" y2="17" />
            </svg>
         ),
         label: "Наличные",
         desc: "Курьеру при получении заказа",
      },
   ];

   return (
      <main style={{background: "#F4F1EC", minHeight: "100vh", paddingBottom: 80}}>
         <div style={dlS.hero}>
            <div style={dlS.container}>
               <span style={dlS.heroLabel}>Условия работы</span>
               <h1 style={dlS.heroTitle}>Доставка и оплата</h1>
               <p style={dlS.heroSub}>Привезём горячее прямо к вам или приготовим к самовывозу</p>
            </div>
         </div>

         <div style={dlS.container}>
            <div style={{paddingTop: 40}}>
               <div style={dlS.optionsGrid}>
                  {/* Delivery card */}
                  <div style={dlS.optionCard}>
                     <div style={dlS.optionTop}>
                        <div style={dlS.optionIconWrap}>
                           <svg
                              width="28"
                              height="28"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round">
                              <rect x="1" y="3" width="15" height="13" rx="2" />
                              <path d="M16 8h4l3 3v5h-7V8z" />
                              <circle cx="5.5" cy="18.5" r="2.5" />
                              <circle cx="18.5" cy="18.5" r="2.5" />
                           </svg>
                        </div>
                        <h2 style={dlS.optionTitle}>Доставка курьером</h2>
                     </div>
                     <div style={dlS.optionBody}>
                        {[
                           ["Стоимость доставки", "Бесплатно при заказе от 500 ₽"],
                           ["Зона доставки", "Радиус 10 км от столовой"],
                           ["Время доставки", "45–60 минут"],
                           ["Часы работы", "Ежедневно 8:00–19:30"],
                        ].map(([l, v]) => (
                           <div key={l} style={dlS.optionRow}>
                              <span style={dlS.optionRowLabel}>{l}</span>
                              <span style={dlS.optionRowVal}>{v}</span>
                           </div>
                        ))}
                     </div>
                     <div style={dlS.optionNote}>При заказе менее 500 ₽ стоимость доставки — 150 ₽</div>
                  </div>

                  {/* Pickup card */}
                  <div style={{...dlS.optionCard, background: "#1E3328"}}>
                     <div style={dlS.optionTop}>
                        <div style={{...dlS.optionIconWrap, background: "rgba(255,255,255,0.15)"}}>
                           <MapPinIcon size={28} />
                        </div>
                        <h2 style={{...dlS.optionTitle, color: "white"}}>Самовывоз</h2>
                     </div>
                     <div style={dlS.optionBody}>
                        {[
                           ["Адрес", "ул. Германа Титова, 6"],
                           ["Время работы", "Пн–Пт: 8:00–20:00"],
                           ["Суббота", "9:00–18:00"],
                           ["Воскресенье", "Выходной"],
                        ].map(([l, v]) => (
                           <div key={l} style={{...dlS.optionRow, borderColor: "rgba(255,255,255,0.1)"}}>
                              <span style={{...dlS.optionRowLabel, color: "rgba(255,255,255,0.5)"}}>{l}</span>
                              <span style={{...dlS.optionRowVal, color: "white"}}>{v}</span>
                           </div>
                        ))}
                     </div>
                     <div style={{...dlS.optionNote, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)"}}>
                        Скидка 5% при самовывозе на любой заказ
                     </div>
                  </div>
               </div>
            </div>

            {/* Map */}
            <div style={dlS.mapSection}>
               <h2 style={dlS.sectionTitle}>Где мы находимся</h2>
               <div style={dlS.mapWrap}>
                  <div style={dlS.mapPlaceholder}>
                     <MapPinIcon size={36} />
                     <p style={{color: "#7A756E", fontFamily: "'Outfit',sans-serif", fontSize: 15, margin: "12px 0 0"}}>ул. Германа Титова, 6</p>
                     <p style={{color: "#B0A898", fontFamily: "'Outfit',sans-serif", fontSize: 13, margin: "4px 0 0"}}>
                        Кликните, чтобы открыть в Google Maps
                     </p>
                  </div>
               </div>
            </div>

            {/* Payment */}
            <div style={dlS.paySection}>
               <h2 style={dlS.sectionTitle}>Способы оплаты</h2>
               <div style={dlS.payGrid}>
                  {payMethods.map(m => (
                     <div key={m.label} style={dlS.payCard}>
                        <div style={dlS.payIcon}>{m.icon}</div>
                        <div>
                           <div style={dlS.payLabel}>{m.label}</div>
                           <div style={dlS.payDesc}>{m.desc}</div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* FAQ */}
            <div style={dlS.faqSection}>
               <h2 style={dlS.sectionTitle}>Часто задаваемые вопросы</h2>
               <div style={dlS.faqList}>
                  {faqs.map((f, i) => (
                     <div key={i} style={dlS.faqItem}>
                        <button style={dlS.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                           <span>{f.q}</span>
                           <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              style={{transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0}}>
                              <polyline points="6 9 12 15 18 9" />
                           </svg>
                        </button>
                        {openFaq === i && <div style={dlS.faqA}>{f.a}</div>}
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </main>
   );
};

const dlS = {
   hero: {background: "#1E3328", padding: "52px 0 44px"},
   container: {maxWidth: 1240, margin: "0 auto", padding: "0 28px"},
   heroLabel: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 2.5,
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.4)",
      fontFamily: "'Outfit',sans-serif",
      display: "block",
      marginBottom: 10,
   },
   heroTitle: {fontSize: "clamp(28px,4vw,46px)", fontFamily: "'Cormorant Garamond',serif", color: "white", margin: "0 0 8px", fontWeight: 700},
   heroSub: {fontSize: 15, color: "rgba(255,255,255,0.5)", margin: 0, fontFamily: "'Outfit',sans-serif"},
   optionsGrid: {display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24},
   optionCard: {background: "white", borderRadius: 20, padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)"},
   optionTop: {display: "flex", alignItems: "center", gap: 14, marginBottom: 24},
   optionIconWrap: {
      width: 52,
      height: 52,
      borderRadius: 14,
      background: "#C4673A",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
   },
   optionTitle: {fontSize: 22, fontFamily: "'Cormorant Garamond',serif", color: "#1A2B1E", margin: 0, fontWeight: 700},
   optionBody: {display: "flex", flexDirection: "column", gap: 0},
   optionRow: {display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #F0EDE8"},
   optionRowLabel: {fontSize: 13, color: "#7A756E", fontFamily: "'Outfit',sans-serif"},
   optionRowVal: {fontSize: 13, fontWeight: 600, color: "#1A2B1E", fontFamily: "'Outfit',sans-serif"},
   optionNote: {
      marginTop: 16,
      background: "#FFF8F0",
      borderRadius: 10,
      padding: "10px 14px",
      fontSize: 12,
      color: "#C4673A",
      fontFamily: "'Outfit',sans-serif",
   },
   mapSection: {marginTop: 52},
   sectionTitle: {
      fontSize: "clamp(20px,2.5vw,28px)",
      fontFamily: "'Cormorant Garamond',serif",
      color: "#1A2B1E",
      margin: "0 0 24px",
      fontWeight: 700,
   },
   mapWrap: {borderRadius: 16, overflow: "hidden"},
   mapPlaceholder: {
      background: "#E8E4DC",
      height: 280,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 16,
      cursor: "pointer",
      color: "#C4673A",
   },
   paySection: {marginTop: 48},
   payGrid: {display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16},
   payCard: {
      background: "white",
      borderRadius: 16,
      padding: "20px 22px",
      display: "flex",
      alignItems: "center",
      gap: 14,
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
   },
   payIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      background: "#FFF4EE",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
   },
   payLabel: {fontSize: 15, fontWeight: 600, color: "#1A2B1E", fontFamily: "'Outfit',sans-serif", marginBottom: 3},
   payDesc: {fontSize: 12, color: "#9A8C7E", fontFamily: "'Outfit',sans-serif"},
   faqSection: {marginTop: 48},
   faqList: {display: "flex", flexDirection: "column", gap: 0},
   faqItem: {background: "white", borderRadius: 0, borderBottom: "1px solid #F0EDE8", overflow: "hidden"},
   faqQ: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      padding: "18px 20px",
      background: "none",
      border: "none",
      cursor: "pointer",
      textAlign: "left",
      fontSize: 15,
      fontWeight: 600,
      color: "#1A2B1E",
      fontFamily: "'Outfit',sans-serif",
   },
   faqA: {padding: "0 20px 18px", fontSize: 14, color: "#7A756E", lineHeight: 1.65, fontFamily: "'Outfit',sans-serif"},
};

export default DeliveryPage;
