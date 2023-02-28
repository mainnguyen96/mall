import StarBar from "../StarBar/StarBar";
import classNames from "classnames/bind";

import styles from "./RateClassify.module.css";

const cx = classNames.bind(styles);

function RateClassify() {
  return (
    <ul className={cx("wrapper")}>
      {[5, 4, 3, 2, 1].map((item) => (
        <li key={item} className={cx("item")}>
          <StarBar size={"small"} rate={item} />
          <div className={cx("star-count")}>
            <div className={cx("count")} style={{ width: 100 }}></div>
          </div>
          <p className={cx("label")}>9</p>
        </li>
      ))}
    </ul>
  );
}

export default RateClassify;
