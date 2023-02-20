import classNames from "classnames/bind";
import { Formik, Form } from "formik";
import icons from "~/assets/icons/ProductCateIcon";
import FilterItem from "./FilterItem/FilterItem";

import styles from "./ProductReviewList.module.css";
import RateClassify from "./RateClassify";
import Review from "./Review/Review";
import StarBar from "./StarBar/StarBar";

const cx = classNames.bind(styles);
const image = [
  "https://salt.tikicdn.com/cache/750x750/ts/review/a0/4a/31/bf231a6e8b8be6f02de1e40aeba679b2.jpg.webp",
  "https://salt.tikicdn.com/cache/750x750/ts/review/8d/24/30/bc1d8d4093e12a03bc026633d29c60a7.jpg.webp",
  "https://salt.tikicdn.com/cache/750x750/ts/review/d9/12/a8/f0dce7a4451ece9d713f1d9f33ca08c2.jpg.webp",
  "https://salt.tikicdn.com/cache/750x750/ts/review/45/99/55/4145f1f15c1c3ae0dad34660abc1a03e.jpg.webp",
];

const filter = [ '1', '2', '3', '4', '5']

function ProductReviewList() {
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("label")}>Reviews - Reviews From Customers</h3>
      <div className={cx("header")}>
        <div className={cx("rating")}>
          <div className={cx("star-counter")}>
            <h1 className={cx("star-number")}>4.9</h1>
            <div className={cx("star-img")}>
              <StarBar rate={4} size="large" />
              <p className={cx("comment-counter")}>366 comments</p>
            </div>
          </div>
          <RateClassify />
        </div>
        <div className={cx("filter-section")}>
          <div className={cx("all-img")}>
            <div className={cx("img-label")}>All images ( 157 )</div>
            <ul className={cx("img-list")}>
              {image.map((img, index) => (
                <li key={index} className={cx("img-item")}>
                  <img src={img} alt="product image" />
                </li>
              ))}
            </ul>
          </div>
          <div className={cx("filter")}>
            <h4 className={cx("filter-label")}>Filter by:</h4>
            <Formik initialValues={{checked: []}} onSubmit={(values) => console.log(values)}>
              {(formik) => (
                <Form onChangeCapture={() => formik.handleSubmit()}>
                  
                  <FilterItem id="pictures" name="pictures" >
                    Have pictures
                  </FilterItem>
                  {filter.map(filter => (
                    <FilterItem key={filter} id={`${filter}Star`} name={`${filter}Star`} >
                    {filter}
                    <img src={icons.colorStar} alt="star"/>
                  </FilterItem>
                  ))}
                  
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Review/>
      <Review/>
      <Review/>
    </div>
  );
}

export default ProductReviewList;
 