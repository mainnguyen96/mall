import classNames from "classnames/bind";

import ProductItem from "../ProductItem";
import styles from "./ProductList.module.css";

const cx = classNames.bind(styles);

function ProductList({ products }) {
  return (
    <div className={cx("wrapper")}>
      <ul className={cx("list")}>
        {products.map((product) => (
          <li key={product.id} className={cx("item")}>
            <ProductItem
              img={product.img}
              name={product.name}
              star={product.star}
              sold={product.sold}
              discount={product.discount}
              price={product.price}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
