# eCommerce Application (React)

Welcome to our eCommerce application! This platform replicates real-world shopping experiences in a digital environment 🏪.

It's a comprehensive online shopping portal that provides an interactive and seamless experience to users.\
From product discovery to checkout, the application ensures a smooth journey for the user, enhancing their engagement and boosting their purchasing confidence 🚀.

## Table of Contents

- [eCommerce Application (React)](#ecommerce-application-react)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Key Features](#key-features)
  - [Pages](#pages)
  - [Tools Used](#tools-used)
- [Set up](#set-up)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Run application](#run-application)
  - [Tests](#tests)
  - [Building for Production](#building-for-production)
  - [Deployment](#deployment)
  - [Style](#style)

## Introduction

Welcome to our jewelry shop application! This eCommerce platform brings the exquisite world of jewelry to your fingertips. We offer an extensive collection of beautiful and carefully crafted jewelry pieces.

## Key Features

- Product browsing: Users can browse through a vast range of products 💍 and view detailed descriptions.
- Shopping cart: Users can add their favorite items to the basket 🛒 and proceed to checkout 💳.
- User authentication: The application includes user registration and login 📝🔐 functionality.
- Product search: Users can search for products using the product search feature 🔍.
- Product categorization and sorting: The application offers product categorization and sorting to enhance the shopping experience.
- Responsive design: The application is responsive 📲, ensuring it looks great on various devices with a minimum resolution of 390px.

## Pages

The key pages in the application include:

- Login and Registration pages 🖥
- Main page 🏠
- Catalog Product page 📋
- Detailed Product page 🔎
- User Profile page 👤
- Basket page 🛒
- About Us page 🙋‍♂️🙋‍♀️

## Tools Used

- The project utilizes the following tools:
- React: The core library for building the user interface and managing components.
- React Router (v6): For handling client-side routing and navigation in the application.
- CSS Modules: To manage component-scoped styles and avoid CSS class name conflicts.
- Material UI: For a comprehensive set of pre-designed UI components and theming capabilities.
- React Context: To manage and share global state, such as the current user and shopping cart items, across components.
- About CommerceTools
- The application is powered by CommerceTools 🌐.

# Set up

## Prerequisites

- `node@^v16.15.1`
- `npm@^8.11.0`

## Installation

To get started with the application, follow these steps:

1. Clone this repository to your local machine.

```
git clone ...
```

2. Navigate to the project directory.

```
cd ...
```

3. Install the dependencies using npm:

```
npm install
```

# Usage

## Run application

To run the application in development mode, use the following command:

```
npm start
```

This will start the application and open it in your default web browser at http://localhost:3000.

## Tests

To launch the test runner in interactive watch mode, run the following command:

    npm test

This will run the tests and provide feedback on any code changes.

## Building for Production

To build the application for production, use the following command:

    npm run build

This will create an optimized build in the "build" folder, ready to be deployed.

## Deployment

To deploy the application to a remote gh-pages branch, use the following command:

    npm run deploy

This will deploy the contents of the "build" folder to the gh-pages branch.

### Predeploy

Before deploying, you need to create a production build. This script is automatically executed when deploying.

    npm run predeploy

## Style

### Lint

To lint your project files and identify any code style issues, run the following command:

    npm run lint

### Lint:fix

To automatically fix code style issues when possible, run the following command:

    npm run lint:fix

### Format

To format your project files using Prettier, run the following command:

    npm run format

This will apply the defined Prettier rules to all relevant files (js, jsx, ts, tsx, css, md, json) in the "src" folder according to the ".prettierrc" configuration.
