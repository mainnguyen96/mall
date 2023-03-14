import { useEffect, useState } from "react";
import { useField, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import styles from "./CartProduct.module.css";
import { getData } from "~/firebaseServices";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/authSlice";

const cx = classNames.bind(styles);

function CartProduct({
  productId,
  count,
  setPurchaseProducts,
  selected,
  ...props
}) {
  const [quantity, setQuantity] = useState(count);
  const [productInfo, setProductInfo] = useState();
  const [field, meta] = useField(props);
  const auth = useSelector(selectAuth);

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
  useEffect(() => {
    if (selected) {
      setPurchaseProducts((prev) => ({
        totalPrice: prev.totalPrice + productInfo?.total,
        products: { ...prev.products, [productId]: count },
      }));
    } else {
      setPurchaseProducts((prev) => {
        if (prev.totalPrice <= 0) {
          return {
            totalPrice: 0,
            products: { ...prev.products, [productId]: 0 },
          };
        } else {
          return {
            totalPrice: prev.totalPrice - productInfo?.total,
            products: { ...prev.products, [productId]: 0 },
          };
        }
      });
    }
  }, [selected]);

  useEffect(() => {
    setProductInfo((prev) => ({
      ...prev,
      total: prev?.price * quantity,
      totalFormat: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(prev?.price * quantity),
    }));
  }, [quantity]);
  const handleSetQuantity = (action) => {
    if (action === "add") {
      selected &&
        setPurchaseProducts((prev) => ({
          totalPrice: prev.totalPrice + productInfo.price,
          products: {
            ...prev.products,
            [productId]: prev.products[productId] + 1,
          },
        }));
      setQuantity((prev) => {
        return prev + 1;
      });
    } else {
      selected &&
        quantity - 1 >= 0 &&
        setPurchaseProducts((prev) => {
          if (prev.totalPrice <= 0) {
            return {
              totalPrice: 0,
              products: { ...prev.products, productId: 0 },
            };
          } else {
            return {
              totalPrice: prev.totalPrice - productInfo.price,
              products: {
                ...prev.products,
                [productId]: prev.products[productId] - 1,
              },
            };
          }
        });
      setQuantity((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        return 0;
      });
    }
  };
  return (
    <div className={cx("wrapper")}>
      {productInfo && (
        <>
          <Field
            {...field}
            {...props}
            type="checkbox"
            className={cx("checkbox")}
          />
          <div className={cx("product")}>
            <img
              className={cx("product-img")}
              src={productInfo.img}
              alt="product"
            />
            <p className={cx("product-name")}>{productInfo.name}</p>
          </div>
          <h4 className={cx("price")}>{productInfo.priceFormat}</h4>
          <div className={cx("quantity")}>
            <FontAwesomeIcon
              onClick={() => handleSetQuantity("sub")}
              className={cx("quantity-icon")}
              icon={faMinus}
            />
            <label className={cx("quantity-label")}>{quantity}</label>
            <FontAwesomeIcon
              onClick={() => handleSetQuantity("add")}
              className={cx("quantity-icon")}
              icon={faPlus}
            />
          </div>
          <h4 className={cx("money")}>{productInfo.totalFormat}</h4>
          <FontAwesomeIcon icon={faTrashCan} className={cx("icon")} />
        </>
      )}
    </div>
  );
}

export default CartProduct;
