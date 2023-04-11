import { useEffect } from "react";
import { Formik, Form } from "formik";
import classNames from "classnames/bind";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductReview,
  selectReviewData,
  selectReviewImages,
} from "~/features/reviewSlice";
import FilterItem from "./FilterItem";
import RateClassify from "./RateClassify";
import Review from "./Review";
import StarBar from "./StarBar";
import StarOutline from "~/components/StarOutline";
import styles from "./ProductReviewList.module.css";

const cx = classNames.bind(styles);

const filter = ["1", "2", "3", "4", "5"];

function ProductReviewList({ rate, review, productId }) {
  const reviewsData = useSelector(selectReviewData);
  const reviewImages = useSelector(selectReviewImages);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductReview(productId));
  }, [dispatch, productId]);
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("label")}>Reviews - Reviews From Customers</h3>
      <div className={cx("header")}>
        <div className={cx("rating")}>
          <div className={cx("star-counter")}>
            <h1 className={cx("star-number")}>{rate}</h1>
            <div className={cx("star-img")}>
              <StarBar rate={rate} size="large" />
              <p className={cx("comment-counter")}>{review} comments</p>
            </div>
          </div>
          <RateClassify />
        </div>
        <div className={cx("filter-section")}>
          <div className={cx("all-img")}>
            <div className={cx("img-label")}>
              All images ( {reviewImages.length} )
            </div>
            <ul className={cx("img-list")}>
              {reviewImages.map((img, index) => (
                <li key={index} className={cx("img-item")}>
                  <img src={img} alt="product" />
                </li>
              ))}
            </ul>
          </div>
          <div className={cx("filter")}>
            <h4 className={cx("filter-label")}>Filter by:</h4>
            <Formik
              initialValues={{ checked: [] }}
              onSubmit={(values) => console.log(values)}
            >
              {(formik) => (
                <Form onChangeCapture={() => formik.handleSubmit()}>
                  <FilterItem id="pictures" name="pictures">
                    Have pictures
                  </FilterItem>
                  {filter.map((filter) => (
                    <FilterItem
                      key={filter}
                      id={`${filter}Star`}
                      name={`${filter}Star`}
                    >
                      {filter}
                      <StarOutline rate={5} size={"small"} />
                    </FilterItem>
                  ))}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {reviewsData.map((review) => (
        <Review key={review.reviewId} reviewData={review} />
      ))}
    </div>
  );
}

export default ProductReviewList;
