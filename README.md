# Project_Comp

Project comp is a vue project showing a shopping page for lessons.

## Components 

* Shop, this page is the home page where you are able to add to basket, sort and filter through a list of items ect.
* Basket, this is where you can see items added to the basket and remove them, also where you can proceeed to checkout.
* Checkout, this page handles the checkout logic, can enter name and phone number and finish checking out which will send the user to CheckoutConfirm.
* PhoneInput, this component is the only component not part of the router as it handles the logic for the phone input for the checkout page and displaying global phone country codes.
* CheckoutConfirm, displays orders details after checkout and has a button to take the user back to the home page/Shop.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
### Github Pages

The page is hosted on github pages access via this link https://thomasmcerlean.github.io/Project_Comp/