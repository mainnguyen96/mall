import classNames from "classnames/bind";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCameraRetro } from "@fortawesome/free-solid-svg-icons";

import ReviewStar from "./ReviewStar";
import Button from "~/components/Button";
import styles from "./OrderDetail.module.css";
import { updateReview } from "~/firebaseServices/firebaseServices";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/authSlice";

const cx = classNames.bind(styles);

function ReviewForm({ productData, SetIsShowReview }) {
  const [images, setImages] = useState([]);
  const [reviewStar, setReviewStar] = useState(0);
  const [comment, setComment] = useState();
  const auth = useSelector(selectAuth);

  const handleAddImages = (images) => {
    console.log("run");
    const thumbs = [];
    for (let i = 0; i < images.length; i++) {
      thumbs.push(URL.createObjectURL(images[i]));
    }
    console.log("thumbs:", thumbs);
    setImages(thumbs);
  };
  const handleRemoveImage = (url) => {
    const thumbs = images.filter((image) => image !== url);
    setImages(thumbs);
  };
  return (
    <Formik
      initialValues={{ rate: reviewStar, thumbs: images, comment: comment }}
      enableReinitialize={true}
      onSubmit={(values) => {
        const data = {
          ...values,
        };
        updateReview(auth.userId, productData.id, data);
      }}
    >
      {(formik) => (
        <Form className={cx("review")}>
          <div
            onClick={() => SetIsShowReview(false)}
            className={cx("close-btn")}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
          <div className={cx("review-product")}>
            <img src={productData?.img} alt={"review product"} />
            <label className={cx("review-product-name")}>
              {productData?.name}
            </label>
          </div>
          <ReviewStar
            setReviewStar={setReviewStar}
            reviewStar={reviewStar}
            name={"rate"}
            id={"rate"}
            value={formik.values.rate}
          />
          <Field
            as={"textarea"}
            name={"comment"}
            id={"comment"}
            onChange={(event) => {
              setComment(event.target.value);
            }}
            className={cx("review-text-area")}
            placeholder="Please share your comments and reviews about this product"
          />
          <ul className={cx("img-thumb")}>
            {images.map((image, index) => (
              <li key={index} className={cx("img-item")}>
                <FontAwesomeIcon
                  onClick={() => handleRemoveImage(image)}
                  icon={faXmark}
                />
                <img src={image} alt="thumbnail" />
              </li>
            ))}
          </ul>
          <div className={cx("review-btns")}>
            <label htmlFor={"images"} className={cx("review-img")}>
              <FontAwesomeIcon icon={faCameraRetro} />
              Choose images
              <Field
                className={cx("review-img-btn")}
                name={"images"}
                id={"images"}
                type="file"
                multiple
                onChange={(event) => {
                  console.log(event.target.files);
                  handleAddImages(event.target.files);
                }}
              />
            </label>

            <Button
              size={"small"}
              styles={"primary"}
              label={"Submit a review"}
              type={"submit"}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ReviewForm;
