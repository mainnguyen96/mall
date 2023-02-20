import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Button.module.css";

const cx = classNames.bind(styles);

function Button({ label, styles, icon, onClick, size, type }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cx("wrapper", styles, size)}
    >
      {icon && <FontAwesomeIcon icon={icon} className={cx("icon")} />}
      {label}
    </button>
  );
}

export default Button;
