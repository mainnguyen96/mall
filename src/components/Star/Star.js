import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import icons from "~/assets/icons/ProductCateIcon";

import styles from "./Star.module.css";

const cx = classNames.bind(styles);

function Star() {
  return (
    <div className={cx("wrapper")}>
      <img src={icons.partialStar} />
    </div>
  );
}

export default Star;
