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

Этот мини-проект был реализован в рамках тестового задания.

---

## Описание

В начале работы над проектом у меня было недостаточно опыта работы со Swagger, поэтому я сначала попытался вручную создать и использовать кастомные типы для взаимодействия с API. Однако при этом возникли различные ошибки типов и проблемы с совместимостью.

После изучения документации и практики мне удалось настроить генерацию TypeScript-типов с помощью командной строки для Swagger → TypeScript. Благодаря этому я смог корректно использовать типы, сгенерированные из спецификации Swagger.

В результате я успешно реализовал:
✅ создание новой задачи (create task)  
✅ обновление существующей задачи (update task)

---

## Стек технологий

- React
- TypeScript
- React Router DOM
- React Query
- Material UI
- Swagger → TypeScript генерация типов

---

## Примечание

Я пока не являюсь экспертом в TypeScript, поэтому в коде еще могут встречаться некоторые ошибки и неоптимальные решения. Тем не менее, работа над этим мини-проектом была для меня очень интересной и полезной.

Хочу поблагодарить команду Avito за это задание — благодаря нему я многому научился!

---

## Запуск проекта

```bash
npm install
npm start

```
