import classNames from "classnames/bind";

import ProductItem from "./ProductItem";
import styles from "./ProductList.module.css";

const cx = classNames.bind(styles);

function ProductList({ products }) {
  return (
    <div className={cx("wrapper")}>
      <ul className={cx("list")}>
        {products.map((product) => (
          <li key={product.id} className={cx("item")}>
            <ProductItem
              img={product.data.img}
              name={product.data.name}
              star={product.data.star}
              sold={product.data.sold}
              discount={product.data.discount}
              price={product.data.price}
              productId={product.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
