export const getTermsFormat = (numberOfItems: number | undefined): string => {
  switch (numberOfItems) {
    case 0 || null || undefined:
      return `There's no terms in this study set. Create one!`;
    case 1:
      return `${numberOfItems} term`;
    default:
      return `${numberOfItems} terms`;
  }
};
