# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})

# Мини-проект: Управление задачами (Task Manager)

# React Task Management System

Проект представляет собой систему управления задачами (Task Management System), разработанную с использованием React, TypeScript и библиотеки Material-UI.

## О проекте

Это мини-проект, реализованный в рамках учебной программы Avito Tech. Система позволяет:

- Создавать и управлять задачами
- Назначать исполнителей
- Менять статусы задач (Backlog, In Progress, Done)
- Управлять приоритетами задач
- Организовывать задачи по доскам (boards)

## Технологический стек

- React 18
- TypeScript
- Material-UI (MUI)
- React Router
- TanStack Query (ранее React Query)
- Swagger/OpenAPI для типизации API

## Мой опыт разработки

### Проблемы и решения

1. **Работа со Swagger/OpenAPI**:
   - Изначально я не полностью понимал, как работать с Swagger, поэтому создавал кастомные типы вручную
   - Столкнулся с проблемами при обновлении и создании задач
   - После исследования нашел способ генерации TypeScript-типов из Swagger-спецификации с помощью командной строки
   - Успешно реализовал генерацию типов и интеграцию с API

2. **TypeScript**:
   - Еще не полностью освоил TypeScript, поэтому в коде остаются некоторые ошибки типизации
   - Тем не менее, TypeScript помог избежать многих потенциальных ошибок во время разработки

3. **React Query**:
   - Изначально были проблемы с немедленным обновлением UI после мутаций
   - Решил проблему через оптимистичные обновления и правильную инвалидацию кэша

### Особенности реализации

- Использование Material-UI для красивого и отзывчивого интерфейса
- Кастомные модальные окна для редактирования задач
- Интеграция с бэкендом через сгенерированные Swagger-типы
- Оптимистичные обновления для мгновенного отражения изменений в UI

## Установка и запуск

1. Установите зависимости:
```bash
npm install
Запустите development сервер:
```

bash
npm run dev
Благодарности
Хочу выразить большую благодарность команде Avito Tech за этот интересный мини-проект. Несмотря на сложности, работа над этим проектом была очень познавательной и увлекательной.

Планы по улучшению
Улучшить типизацию и устранить оставшиеся ошибки TypeScript

Добавить больше тестов

Реализовать drag-and-drop для задач между статусами

Добавить возможность прикрепления файлов к задачам
```
