import classNames from "classnames/bind";
import { useState, useEffect } from "react";

import { getData } from "~/firebaseServices";
import styles from "./Checkout.module.css";

const cx = classNames.bind(styles);

function CheckoutProduct({ productId, count }) {
  const [productInfo, setProductInfo] = useState();
  useEffect(() => {
    getData("products/" + productId).then((data) => {
      setProductInfo({
        name: data.name,
        priceFormat: new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(data.price),
        price: data.price,
        img: data.img[0],
        totalFormat: new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(data.price * count),
        total: data.price * count,
      });
    });
  }, [count, productId]);

  return (
    <div className={cx("product")}>
      {productInfo && (
        <>
          <img
            className={cx("product-image")}
            src={productInfo.img}
            alt="product"
          />
          <div className={cx("product-info")}>
            <label className={cx("product-name")}>{productInfo.name}</label>
            <br />
            <span className={cx("product-quantity")}>Count: {count}</span>
            <span className={cx("product-price")}>
              {productInfo.totalFormat}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default CheckoutProduct;
