import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import { convertCurrency, getProductById } from "~/ultil";
import Button from "~/components/Button";
import Modal from "~/components/Modal";
import ReviewForm from "./ReviewForm";
import styles from "./OrderDetail.module.css";

const cx = classNames.bind(styles);

function DetailProductItem({ product }) {
  const [productId, count] = product;
  const [productData, setProductData] = useState();
  const [isShowReview, SetIsShowReview] = useState(false);
  const [productInfo, setProductInfo] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getProductById(productId).then((data) => setProductInfo(data));
  }, [dispatch, productId]);

  useEffect(() => {
    setProductData({
      name: productInfo.data.name,
      img: productInfo.data.img[0],
      price: convertCurrency(productInfo.data.price),
      total: convertCurrency(productInfo.data.price * count),
      count: count,
      id: productInfo.id,
    });
  }, [productInfo, productId, count]);

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
