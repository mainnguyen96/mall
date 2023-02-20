import config from "~/components/config";
import Home from "../Home";
import Categories from "../Categories";
import Product from "../Product";
import User from "../User";

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.category, component: Categories },
  { path: config.routes.product, component: Product },
];

const privateRoutes = [{ path: config.routes.user, component: User }];

export { publicRoutes, privateRoutes };
