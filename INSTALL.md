# СИТНЫЙ — Установка и запуск

## Требования
- Node.js 18+ (проверить: `node -v`)
- npm 9+ (идёт в комплекте с Node.js)

## Установка

1. Распакуйте архив в любую папку:
   ```
   sitny-stolovaya/
   ```

2. Перейдите в папку проекта:
   ```bash
   cd sitny-stolovaya
   ```

3. Установите зависимости:
   ```bash
   npm install
   ```

## Запуск

```bash
npm run dev
```

Браузер откроется автоматически по адресу: **http://localhost:5173**

## Сборка для продакшена

```bash
npm run build
```

Результат в папке `dist/`.

## Структура проекта

```
sitny-stolovaya/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Шапка, слайдер
│   │   ├── Footer.jsx       # Подвал
│   │   ├── HomePage.jsx     # Главная страница
│   │   ├── CatalogPage.jsx  # Каталог блюд
│   │   ├── PromoPage.jsx    # Акции
│   │   ├── DeliveryPage.jsx # Доставка и оплата
│   │   ├── CartPage.jsx     # Корзина и оформление
│   │   ├── ProductCard.jsx  # Карточка блюда + модальное окно
│   │   └── icons.jsx        # SVG иконки и иллюстрации
│   ├── data/
│   │   └── menu.js          # Данные меню, категорий, акций
│   ├── App.jsx              # Корневой компонент (роутинг + состояние)
│   └── main.jsx             # Точка входа
├── index.html
├── vite.config.js
└── package.json
```
