import { MAX_ARRAY_INDEX } from './_setup';

export default function createSizePropertyCheck(getSizeProperty: (collection: any) => number) {
  return (collection: any) => {
    const sizeProperty = getSizeProperty(collection);
    return typeof sizeProperty === 'number' && sizeProperty >= 0 && sizeProperty <= MAX_ARRAY_INDEX;
  };
}
