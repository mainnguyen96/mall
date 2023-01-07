import classNames from "classnames/bind";

import styles from "./Badge.module.css";

const cx = classNames.bind(styles);

function Badge({ value }) {
  return <div className={cx("wrapper")}>{value}</div>;
}

export default Badge;
