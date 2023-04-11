import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useField, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import { convertCurrency, getProductById } from "~/ultil";
import { removeCartItem } from "~/features/cartSlice";
import styles from "./CartProduct.module.css";

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
  const [productData, setProductData] = useState();
  const dispatch = useDispatch();
  const [field, meta] = useField(props);

  useEffect(() => {
    getProductById(productId).then((data) => setProductData(data));
  }, [dispatch, productId]);

  useEffect(() => {
    setProductInfo({
      name: productData?.data.name,
      priceFormat: convertCurrency(productData?.data.price),
      price: productData?.data.price,
      img: productData?.data.img[0],
      totalFormat: convertCurrency(productData?.data.price * count),
      total: productData?.data.price * count,
    });
  }, [productData, count]);

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
  }, [selected, count, productId, productInfo, setPurchaseProducts]);

  useEffect(() => {
    setProductInfo((prev) => ({
      ...prev,
      total: prev?.price * quantity,
      totalFormat: convertCurrency(prev?.price * quantity),
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

  const handleRemoveProduct = () => {
    dispatch(removeCartItem(productId));
  };

  return (
    <tr className={cx("wrapper")}>
      {productInfo && (
        <>
          <td className={cx("product-td")}>
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
          </td>
          <td className={cx("right")}>{productInfo.priceFormat}</td>
          <td className={cx("quantity-td")}>
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
          </td>
          <td className={cx("money", "right")}>{productInfo.totalFormat}</td>
          <td>
            <FontAwesomeIcon
              onClick={handleRemoveProduct}
              icon={faTrashCan}
              className={cx("icon")}
            />
          </td>
        </>
      )}
    </tr>
  );
}

export default CartProduct;
