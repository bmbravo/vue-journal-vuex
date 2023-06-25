export default {
  name: 'daybook',
  component: () =>
    import(
      /* webpackChunkName: "daybook" */ '@/modules/daybook/layouts/DayBookLayout'
    ),
  children: [
    {
      path: '',
      name: 'no-entry',
      component: () =>
        import(
          /* webpackChunkName: "daybook no entry" */ '@/modules/daybook/views/NoEntrySelected'
        ),
    },
    {
      path: ':id',
      name: 'entry',
      component: () =>
        import(
          /* webpackChunkName: "daybook entry view" */ '@/modules/daybook/views/EntryView'
        ),
    },
  ],
};
