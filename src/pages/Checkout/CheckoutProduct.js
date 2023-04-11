import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

import { convertCurrency, getProductById } from "~/ultil";
import styles from "./Checkout.module.css";

const cx = classNames.bind(styles);

function CheckoutProduct({ productId, count }) {
  const [productInfo, setProductInfo] = useState();
  const [product, setProduct] = useState();
  const fetchProductsStatus = useSelector((state) => state.products.status);

  useEffect(() => {
    getProductById(productId).then((data) => setProduct(data));
  });

  useEffect(() => {
    if (product) {
      setProductInfo({
        name: product.data.name,
        priceFormat: convertCurrency(product.data.price),
        price: product.data.price,
        img: product.data.img[0],
        totalFormat: convertCurrency(product.data.price * count),
        total: product.data.price * count,
      });
    }
  }, [product, fetchProductsStatus, count]);

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
