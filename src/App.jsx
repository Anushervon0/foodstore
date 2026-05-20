import React from "react";
import {Header, ToastContainer} from "./components/Header.jsx";
import {Footer} from "./components/Footer.jsx";
import HomePage from "./components/HomePage.jsx";
import CatalogPage from "./components/CatalogPage.jsx";
import PromoPage from "./components/PromoPage.jsx";
import DeliveryPage from "./components/DeliveryPage.jsx";
import CartPage from "./components/CartPage.jsx";
import {ProductModal} from "./components/ProductCard.jsx";

export default function App() {
   const [page, setPage] = React.useState("home");
   const [cart, setCart] = React.useState([]);
   const [modalItem, setModalItem] = React.useState(null);
   const [toasts, setToasts] = React.useState([]);

   // Scroll to top on page change
   React.useEffect(() => {
      window.scrollTo({top: 0, behavior: "smooth"});
   }, [page]);

   const showToast = name => {
      const id = Date.now();
      setToasts(t => [...t, {id, name}]);
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2500);
   };

   const addToCart = item => {
      const addQty = item.qty || 1;
      setCart(prev => {
         const existing = prev.find(c => c.id === item.id);
         if (existing) {
            return prev.map(c => (c.id === item.id ? {...c, qty: c.qty + addQty} : c));
         }
         return [...prev, {...item, qty: addQty}];
      });
      showToast(item.name);
   };

   const updateQty = (id, qty) => {
      if (qty <= 0) {
         setCart(prev => prev.filter(c => c.id !== id));
      } else {
         setCart(prev => prev.map(c => (c.id === id ? {...c, qty} : c)));
      }
   };

   const removeFromCart = id => {
      setCart(prev => prev.filter(c => c.id !== id));
   };

   const cartCount = cart.reduce((s, i) => s + i.qty, 0);
   const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

   const renderPage = () => {
      switch (page) {
         case "catalog":
            return <CatalogPage onAdd={addToCart} onOpen={setModalItem} />;
         case "promo":
            return <PromoPage onCatalog={() => setPage("catalog")} />;
         case "delivery":
            return <DeliveryPage />;
         case "cart":
            return <CartPage cart={cart} onUpdate={updateQty} onRemove={removeFromCart} setPage={setPage} />;
         default:
            return <HomePage onCatalog={() => setPage("catalog")} onAdd={addToCart} onOpen={setModalItem} setPage={setPage} />;
      }
   };

   return (
      <>
         <Header page={page} setPage={setPage} cartCount={cartCount} cartTotal={cartTotal} />
         {renderPage()}
         <Footer setPage={setPage} />
         {modalItem && (
            <ProductModal
               item={modalItem}
               onClose={() => setModalItem(null)}
               onAdd={item => {
                  addToCart(item);
               }}
            />
         )}
         <ToastContainer toasts={toasts} />
      </>
   );
}
