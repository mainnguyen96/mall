import { useState } from "react";
import { Field, useField } from "formik";
import classNames from "classnames/bind";

import { reviewLabel } from "~/ultil";
import StarOutline from "~/components/StarOutline";
import styles from "./OrderDetail.module.css";

const cx = classNames.bind(styles);

function ReviewStar({ setReviewStar, reviewStar, ...props }) {
  const [rateHoverLevel, setRateHoverLevel] = useState([0, 0, 0, 0, 0]);
  const [rateLevel, setRateLevel] = useState([0, 0, 0, 0, 0]);
  const [label, setLabel] = useState("Please review");
  const [isSetLabel, SetIsSetLabel] = useState();
  const [field, meta] = useField(props);
  const handleHoverRate = (index) => {
    const rate = [0, 0, 0, 0, 0];
    for (let i = 0; i <= index; i++) {
      rate[i] = 5;
    }
    setRateHoverLevel(rate);
    setLabel(reviewLabel[index]);
  };
  const handleResetRate = (index) => {
    setRateHoverLevel([0, 0, 0, 0, 0]);
    if (isSetLabel) {
      setLabel(isSetLabel);
    } else {
      setLabel("Please review");
    }
  };
  const handleSetRate = (index) => {
    console.log("set");
    SetIsSetLabel(reviewLabel[index]);
    const rate = [0, 0, 0, 0, 0];
    for (let i = 0; i <= index; i++) {
      rate[i] = 5;
    }
    setReviewStar(index + 1);
    setLabel(reviewLabel[index]);
    setRateLevel(rate);
  };
  return (
    <div className={cx("review-level")}>
      <label className={cx("review-level-label")}>{label}</label>
      <div className={cx("review-field")}>
        <Field {...field} {...props} type={"range"} min={0} max={5} step={1} />
      </div>
      <ul className={cx("review-star-list")}>
        {rateHoverLevel.map((value, index) => (
          <li
            key={index}
            className={cx("review-item")}
            onMouseEnter={() => handleHoverRate(index)}
            onMouseLeave={() => handleResetRate(index)}
            onClick={() => handleSetRate(index)}
          >
            <StarOutline
              size={"large"}
              rate={reviewStar >= index + 1 ? 5 : value}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewStar;
