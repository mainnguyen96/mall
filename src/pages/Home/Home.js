import classNames from "classnames/bind";

import ProductList from "~/components/ProductList";
import TemplePage from "../TemplePage";
import ProductCate from "~/components/ProductCate";
import styles from "./Home.module.css";

const cx = classNames.bind(styles);

function Home() {
  return (
    <TemplePage>
      <ProductCate />
      <ProductList />
    </TemplePage>
  );
}

export default Home;
