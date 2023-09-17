const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

const addVerb = (name: string): string => {
  const itemName = name.toLowerCase();

  return itemName[itemName.length - 1] === 's' ? `${itemName} were` : `${itemName} was`;
};

const transormName = (name: string): string => capitalizeFirstLetter(addVerb(name));

export const makeItemRemovedMessage = (name: string): string => `${transormName(name)} removed from your cart`;

export const makeItemAddedMessage = (name: string): string => `${transormName(name)} added to your cart`;

export const makeItemsRemovedMessage = (name: string): string => {
  const itemName = name.toLowerCase();
  const pluralizedName = itemName[itemName.length - 1] === 's' ? `${itemName}` : `${itemName}s`;

  return `All ${pluralizedName} were removed from your cart`;
};
