import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
} from '@tanstack/react-router';

import App from './pages/App.tsx';
import GamePage from './pages/GamePage.tsx';
import './index.css';

// definindo a rootRoute
const rootRoute = createRootRoute(); // sem path = raiz

// Rotas filhas
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/', // raiz
  component: App, //componente que vai ser rendenizado
});

const gameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/game/$id', // tanstack usa $id" em vez de ":id" que usa no routerdom
  component: GamePage,
});

//Monte a routeTree
const routeTree = rootRoute.addChildren([indexRoute, gameRoute]); // [5]

//Crie o router
const router = createRouter({ routeTree }); // [5]

//(TS) Registre o tipo do router para tipagem
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// corpo onde chama as rotas
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
} else {
  throw new Error('Root element not found');
}
