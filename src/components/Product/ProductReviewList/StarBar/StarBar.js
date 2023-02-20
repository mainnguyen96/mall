import classNames from "classnames/bind";

import icons from "~/assets/icons/ProductCateIcon";
import styles from "./StarBar.module.css";

const cx = classNames.bind(styles);

function StarBar({ rate, size }) {
  const rating = Array(Math.round(rate)).fill(1);
  const noRating = Array(Math.round(5 - rate)).fill(1);
  return (
    <ul className={cx("wrapper")}>
      {rating.map((star, index) => (
        <li key={index} className={cx("star", size)}>
          <img src={icons.colorStar} alt="star" />
        </li>
      ))}
      {noRating.map((star, index) => (
        <li key={index} className={cx("star", size)}>
          <img src={icons.greyStar} alt="star" />
        </li>
      ))}
    </ul>
  );
}

export default StarBar;
