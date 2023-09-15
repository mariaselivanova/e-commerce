const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

export const makeItemRemovedMessage = (name: string): string => {
  const itemName = name.toLowerCase();
  const pluralizedName = itemName[itemName.length - 1] === 's' ? `${itemName} were` : `${itemName} was`;

  return `${capitalizeFirstLetter(pluralizedName)} removed from your cart`;
};

export const makeItemsRemovedMessage = (name: string): string => {
  const itemName = name.toLowerCase();
  const pluralizedName = itemName[itemName.length - 1] === 's' ? `${itemName}` : `${itemName}s`;

  return `All ${pluralizedName} were removed from your cart`;
};

export const makeItemAddedMessage = (name: string): string => {
  const itemName = name.toLowerCase();
  const pluralizedName = itemName[itemName.length - 1] === 's' ? `${itemName} were` : `${itemName} was`;

  return `${capitalizeFirstLetter(pluralizedName)} added to your cart`;
};
