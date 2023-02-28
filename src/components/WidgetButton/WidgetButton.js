import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";

import Badge from "../Badge";
import styles from "./WidgetButton.module.css";

const cx = classNames.bind(styles);

function WidgetButton({ icon, onClick }) {
  return (
    <button onClick={onClick} className={cx("wrapper")}>
      <div className={cx("badge")}>
        <Badge />
      </div>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}

export default WidgetButton;
