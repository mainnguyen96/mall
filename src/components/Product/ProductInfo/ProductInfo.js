import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import { authNeedSet, selectAuth } from "~/features/authSlice";
import { addNewCartItem } from "~/features/cartSlice";
import { convertCurrency } from "~/ultil";
import ImageShow from "./ImageShow";
import Ship from "./Ship";
import Button from "../../Button";
import Star from "~/components/Star";
import styles from "./ProductInfo.module.css";

const cx = classNames.bind(styles);

function ProductInfo({
  name,
  brand,
  review,
  sold,
  price,
  imgs,
  star,
  productId,
}) {
  const [quantity, setQuantity] = useState(1);
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const currency = convertCurrency(price);

  const handleSetQuantity = (action) => {
    if (action === "add") {
      setQuantity((prev) => {
        return prev + 1;
      });
    } else {
      setQuantity((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        return 0;
      });
    }
  };
  const handleBuyClick = () => {
    if (auth.auth) {
      dispatch(addNewCartItem({ userId: auth.userId, productId, quantity }));
    } else {
      dispatch(authNeedSet(true));
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("images")}>
        <ImageShow imgs={imgs} />
      </div>
      <div className={cx("info")}>
        <h3 className={cx("brand")}>Brand: {brand}</h3>
        <h3 className={cx("name")}>{name}</h3>
        <div className={cx("more")}>
          <ul className={cx("rating")}>
            {Array(5)
              .fill(1)
              .map((item, index) => (
                <li key={index}>
                  <Star rate={star >= index + 1 ? 5 : (star % 1) * 5} />
                </li>
              ))}
          </ul>
          <p className={cx("review")}>(See {review} reivews)</p>
          <p className={cx("sold")}>Sold {sold}</p>
        </div>
        <div className={cx("body")}>
          <div className={cx("price")}>{currency}</div>
          <Ship />
          <div className={cx("quantity")}>
            Quantity
            <div className={cx("quantity-set")}>
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
          </div>
          <div className={cx("button")}>
            <Button onClick={handleBuyClick} label={"Buy"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
