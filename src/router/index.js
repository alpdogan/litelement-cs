import {Router} from '@vaadin/router';

export const initRouter = (app) => {
  const router = new Router(app);

  router.setRoutes([
    {
      path: '/',
      component: 'employee-layout',
      children: [
        {path: '/', component: 'employee-list'},
        {path: '/add', component: 'employee-form'},
        {path: '/employees', component: 'employee-list'},
        {path: '/edit/:id', component: 'employee-form'},
      ],
    },
  ]);
};
