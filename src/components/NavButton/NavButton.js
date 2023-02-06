import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";

import styles from "./NavButton.module.css";

const cx = classNames.bind(styles);

function NavButton({ type }) {
  let icon;
  if (type === "left") {
    icon = faAngleLeft;
  } else if (type === "right") {
    icon = faAngleRight;
  }
  return (
    <button className={cx("wrapper")}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}

export default NavButton;
