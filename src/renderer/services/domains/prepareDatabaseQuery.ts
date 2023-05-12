export const prepareDatabaseQuery = {
  query: (q: string | undefined, perPage: number, page: number) => ({
    where: {
      ...(q && {
        url: {
          contains: q,
        },
      }),
    },
    take: perPage || 5,
    skip: (page || 0) * (perPage || 5),
  }),

  count: (q: string | undefined) => ({
    where: {
      ...(q && {
        url: {
          contains: q,
        },
      }),
    },
  }),
};

export default prepareDatabaseQuery;
