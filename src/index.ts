export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {
    const extensionService = strapi.plugin("graphql").service("extension");

    extensionService.use({
      resolversConfig: {
        "Query.tensesGames": {
          middlewares: [
            async (next, parent, args, context, info) => {
              const userId = context.state.user.id ?? 0;
              args = {
                ...args,
                filters: {
                  ...args.filters,
                  user: {
                    ...args.filters.user,
                    id: userId,
                  },
                },
              };
              return next(parent, args, context, info);
            },
          ],
        },
      },
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
