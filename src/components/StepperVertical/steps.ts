const Authors = {
  maria: 'maria',
  danuta: 'danuta',
  pavel: 'pavel',
};

export const STEPS = [
  {
    label: 'Sprint #1 - Setting things up',
    tasks: [
      {
        task: 'Task board setup',
        author: Authors.maria,
        description:
          'The hardest part is the start. We had to start somewhere... So we started from the beginning :) We made a task board to help us track our progress and plan our actions',
      },
      {
        task: 'Repository setup',
        author: Authors.maria,

        description: 'Of course we needed our own Github repository for this project',
      },
      {
        task: 'Set up scripts',
        author: Authors.maria,

        description:
          'We had to set up necessary scripts and modules for our project; of course, choosing right ones can be a difficult task... Luckily, we had a great team and a wondeful mentor to help us out!',
      },
      {
        task: 'Husky, jest and testing',
        author: Authors.pavel,

        description: "Testing is also important. So we had to make sure the process will go safe and smooth and pushed code won't break anything",
      },
      {
        task: 'Comprehensive readMe',
        author: Authors.danuta,

        description: 'Clear description helps to deliver necessary details to any user that stumble across this project',
      },
      {
        task: 'API setup',
        author: Authors.maria,

        description: 'In this sprint we also had to make sure commercetools api is ready for work as well',
      },
    ],
  },
  {
    label: 'Sprint #2 - Main pages and user authorization',
    tasks: [
      {
        task: 'Routing and navigation',
        author: Authors.maria,

        description: "Before working on actual pages it's necessary to make sure anyone can safely go from one page to another",
      },
      {
        task: '404 page',
        author: Authors.danuta,

        description: '404 error page is necessary when user tries to access unavaliable or missing pages, indicating that something went wrong',
      },
      {
        task: 'App footer and header',
        author: Authors.danuta,

        description: "Header helps user to navigate throughout the pages, footer contains links to this project's authors",
      },
      {
        task: 'Login page',
        author: Authors.danuta,

        description:
          'User login process, api requests and redirection upon successful login or error displaying upon failed validation (yes, there are validation here as well): all that is at this page',
      },
      {
        task: 'Registration page',
        author: Authors.pavel,

        description:
          'Set of fields allowing user to input personal info, passwords, and ability to set addresses: billing and shipping as well as setting default ones upon registration',
      },
      {
        task: 'Responsive design',
        author: Authors.maria,

        description: "It's also very important for an app to display itself correctly at any devices, including tablets, laptops and phones",
      },
      {
        task: 'App deploy',
        author: Authors.maria,

        description: 'We chose netlify as platform for deploying. We also had to make sure everything will go smooth after deploying app',
      },
    ],
  },
  {
    label: 'Sprint #3 - Catalog, products and user profile',

    tasks: [
      {
        task: 'Catalog page',
        author: Authors.maria,

        description:
          'Page that contains products, categories and subcategories. Also there are search options to find a specific product, ability to apply filters and sorting options',
      },
      {
        task: 'Product page',
        author: Authors.danuta,

        description:
          'After user clicks on a product on catalog page he goes to product page, which contains description and relevant photos of a product with a convenient slider',
      },
      {
        task: 'Profile page',
        author: Authors.pavel,

        description:
          'A page that displays user information and allows to edit it, fields such as name, email and also allows to change password. It displays a list of addresses for current user and allows to add/edit/delete addresses and set them as default billing and shipping',
      },
      {
        task: 'Responsive design',
        author: Authors.danuta,

        description: 'All these had to be accessible on different devices as well',
      },
    ],
  },
  {
    label: 'Sprint #4 - Basket, about page and final enhancements',

    tasks: [
      {
        task: 'Catalog optimization',
        author: Authors.maria,

        description: 'Loading all products at once may not be the best practice. We had to make sure the data will be divided by pages',
      },
      {
        task: 'Cart / basket',
        author: Authors.danuta,

        description:
          "User should be able to add to cart any product on product page; modify it's quantity, should be able to remove any item and recalculate total cost of the basket",
      },
      {
        task: 'Catalog page add to cart',
        author: Authors.maria,

        description: 'User should be able not only to add products at product page, but also at catalog page',
      },
      {
        task: 'Discount codes',
        author: Authors.pavel,

        description: 'Discount codes should be displayed at main page and can be used to apply discount to products in an active cart',
      },
      {
        task: 'About us',
        author: Authors.pavel,

        description:
          "It would be nice to have some kind of page about creators of this project... Maybe even show their progress and distribution accross all these tasks... Oh, right. We're here. It was a pleasure by the way",
      },
    ],
  },
];
