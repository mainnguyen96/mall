import { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";

import { getData } from "~/firebaseServices/firebaseServices";
import styles from "./ProductSimilar.module.css";
import ProductItem from "../ProductList/ProductItem";
import NavButton from "../NavButton";

const cx = classNames.bind(styles);

function ProductSimilar() {
  const [products, setProducts] = useState();
  const listRef = useRef(null);
  useEffect(() => {
    getData("products").then((data) => {
      setProducts(Object.values(data));
    });
  }, []);
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
