import classNames from "classnames/bind";

import StarOutline from "~/components/StarOutline";
import styles from "./StarBar.module.css";

const cx = classNames.bind(styles);

function StarBar({ rate, size }) {
  return (
    <ul className={cx("wrapper")}>
      {Array(5)
        .fill(1)
        .map((item, index) => (
          <li key={index}>
            <StarOutline
              size={size}
              rate={rate >= index + 1 ? 5 : rate < index ? 0 : (rate % 1) * 5}
            />
          </li>
        ))}
    </ul>
  );
}

export default StarBar;
