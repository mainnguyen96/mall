import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Badge from "../Badge";
import styles from "./WidgetButton.module.css";

const cx = classNames.bind(styles);

function WidgetButton({ icon }) {
  return (
    <button className={cx("wrapper")}>
      <div className={cx("badge")}>
        <Badge />
      </div>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}

export default WidgetButton;
