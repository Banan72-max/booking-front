# Booking — frontend

React + TypeScript интерфейс онлайн-букинга: поиск и фильтрация объектов,
бронирование с проверкой занятых дат, отзывы, оплата, уведомления,
личный кабинет (с панелью объектов для роли OWNER) и админ-панель.

Backend (отдельный репозиторий): `<ссылка-на-репозиторий-booking-backend>`
— frontend ходит к нему через `VITE_API_URL`.

## Стек

React 18, TypeScript 5, Vite 5, Tailwind CSS 3 (дизайн-вариант «Minimal
Dark»), Zustand 4, TanStack Query 5, React Router 6. Архитектура — FSD
(Feature-Sliced Design): `app → pages → widgets → features → entities → shared`.

## Быстрый старт

```bash
git clone <ссылка-на-этот-репозиторий> booking-frontend
cd booking-frontend
npm install
cp .env.example .env       # укажите VITE_API_URL backend-а
npm run dev                 # http://localhost:5173
```

Backend должен быть запущен отдельно (см. README репозитория `booking-backend`).

## Переменные окружения (.env.example)

```
VITE_API_URL=http://localhost:3000
```

## Структура (FSD)

```
booking-frontend/src/
├── app/{providers,router,store}      # 4 Zustand-стора
├── pages/{home,listing,profile,auth,admin}
├── widgets/{header,search-filters,listing-list,booking-form,
│            review-list,booking-list,notification-bell,payment-widget}
├── features/{auth,booking-crud,listing-crud,review-crud,
│             payment-flow,notification-read,search-filter,admin-panel}
├── entities/{user,listing,booking,category,review,payment,amenity,notification}
└── shared/{ui,api,config,lib}
```

`shared/ui` — UI-кит: Button, Input, Select, Card, Modal, Badge, Spinner,
DatePicker. `app/store/authStore` персистится в localStorage (`zustand/persist`),
остальные сторы — in-memory.

## Сборка и деплой (Vercel)

```bash
npm run build      # tsc -b && vite build → dist/
npm run preview
```

1. Импортировать репозиторий на vercel.com. Framework: Vite. Build Command:
   `npm run build`. Output: `dist`.
2. Env var: `VITE_API_URL=https://<ваш-backend>.up.railway.app`.
3. Автодеплой при push в `main`, Preview URL на каждый PR.

## CI/CD

`.github/workflows/ci.yml`: lint (ESLint) → build (`vite build`).

## Линт

```bash
npm run lint
```
