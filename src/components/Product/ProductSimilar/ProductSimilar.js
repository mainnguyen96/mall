import { useRef } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

import { selectAllProducts } from "~/features/cateProductsSlice";
import NavButton from "~/components/NavButton";
import ProductItem from "~/components/ProductList/ProductItem";
import styles from "./ProductSimilar.module.css";

const cx = classNames.bind(styles);

function ProductSimilar() {
  const products = useSelector(selectAllProducts);
  const listRef = useRef(null);
  const handleMove = (type) => {
    if (type === "right") {
      listRef.current.scrollLeft += 200;
    } else if (type === "left") {
      listRef.current.scrollLeft -= 200;
    }
  };

  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("label")}>Similar Product</h3>
      <ul className={cx("list")} ref={listRef}>
        {products &&
          products.map((product) => (
            <li key={product.id} className={cx("item")}>
              <ProductItem
                img={product.data.img}
                name={product.data.name}
                star={product.data.star}
                sold={product.data.sold}
                discount={product.data.discount}
                price={product.data.price}
              />
            </li>
          ))}
      </ul>
      <div onClick={() => handleMove("left")} className={cx("left-btn")}>
        <NavButton type={"left"} />
      </div>
      <div onClick={() => handleMove("right")} className={cx("right-btn")}>
        <NavButton type={"right"} />
      </div>
    </div>
  );
}

export default ProductSimilar;
