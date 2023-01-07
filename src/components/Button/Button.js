import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Badge from "../Badge";
import styles from "./Button.module.css";

const cx = classNames.bind(styles);

function Button({ icon, label, type, location }) {
  return (
    <button className={cx("wrapper", type)}>
      <div className={cx("badge")}>
        <Badge />
      </div>
      {typeof icon === "string" ? (
        <img className={cx("imgIcon")} alt="icon" src={icon} />
      ) : (
        <FontAwesomeIcon icon={icon} className={cx("faIcon")} />
      )}

      {label}
      {location && <span className={cx("location")}>{location}</span>}
    </button>
  );
}

export default Button;
