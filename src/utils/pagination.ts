export const pagination = {
  numberOfPages(length: number, limit: number) {
    return Math.ceil(length / limit);
  },
};
