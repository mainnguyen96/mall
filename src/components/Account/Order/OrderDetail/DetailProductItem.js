import { faCameraRetro, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Formik, Form, Field } from "formik";
import { ImageInput } from "formik-file-and-image-input";
import { useEffect, useState } from "react";

import Button from "~/components/Button";
import Modal from "~/components/Modal";
import { getData } from "~/firebaseServices";
import { convertCurrency } from "~/ultil";
import ReviewForm from "./ReviewForm";
import styles from "./OrderDetail.module.css";
import { useNavigate } from "react-router-dom";
import { routes } from "~/config/routes";

const cx = classNames.bind(styles);

function DetailProductItem({ product }) {
  const [productData, setProductData] = useState();
  const [isShowReview, SetIsShowReview] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getData("products/" + product.id).then((data) => {
      setProductData({
        name: data.name,
        img: data.img[0],
        price: convertCurrency(data.price),
        total: convertCurrency(data.price * product.count),
        count: product.count,
        id: product.id,
      });
    });
  }, [product]);

  const handleRePurchase = (productId) => {
    navigate("/product/" + productId);
  };

  const DetailProduct = ({ SetIsShowReview }) => {
    return (
      <div className={cx("detail-product")}>
        <img src={productData?.img} alt="detail product" />
        <div className={cx("product-info")}>
          <p className={cx("product-name")}>{productData?.name}</p>
          <div className={cx("button")}>
            <Button
              styles={"outline"}
              size={"small"}
              label={"Chat with the seller"}
            />
            <Button
              styles={"outline"}
              size={"small"}
              label={"Write a review"}
              onClick={() => SetIsShowReview(true)}
            />
            <Button
              onClick={() => handleRePurchase(productData.id)}
              styles={"outline"}
              size={"small"}
              label={"Repurchase"}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <tr>
      <td>
        {isShowReview && (
          <div className={cx("modal")}>
            <Modal />
            <div className={cx("form")}>
              <ReviewForm
                productData={productData}
                SetIsShowReview={SetIsShowReview}
              />
            </div>
          </div>
        )}
        <DetailProduct SetIsShowReview={SetIsShowReview} />
      </td>
      <td className={cx("table-price")}>{productData?.price}</td>
      <td>{productData?.count}</td>
      <td>0</td>
      <td className={cx("table-price")}>{productData?.total}</td>
    </tr>
  );
}

export default DetailProductItem;
