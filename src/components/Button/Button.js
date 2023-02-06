import classNames from "classnames/bind";

import styles from "./Button.module.css";

const cx = classNames.bind(styles);

function Button({ label, type }) {
  return (
    <button type={type} className={cx("wrapper")}>
      {label}
    </button>
  );
}

export default Button;
