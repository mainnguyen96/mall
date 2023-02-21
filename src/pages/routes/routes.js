import config from "~/config";
import Home from "../Home";
import Categories from "../Categories";
import Product from "../Product";
import User from "../User";
import Cart from "../Cart";
import Checkout from "../Checkout";

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.category, component: Categories },
  { path: config.routes.product, component: Product },
];

const privateRoutes = [
  { path: config.routes.user, component: User },
  { path: config.routes.cart, component: Cart },
  { path: config.routes.checkout, component: Checkout },
];

export { publicRoutes, privateRoutes };
