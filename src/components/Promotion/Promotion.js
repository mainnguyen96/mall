import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faReceipt } from "@fortawesome/free-solid-svg-icons";

import Button from "../Button";
import styles from "./Promotion.module.css";

const cx = classNames.bind(styles);

function Promotion() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("promotion-header")}>
        <p className={cx("promotion-label")}>Mall Promotion</p>
        <p className={cx("promotion-sublabel")}>
          2 can be selected
          <Tippy
            content={
              <p className={cx("icon-label")}>
                Apply up to 1 Discount Code and 1 Shipping Code
              </p>
            }
            placement="bottom"
          >
            <FontAwesomeIcon
              className={cx("promotion-icon")}
              icon={faCircleInfo}
            />
          </Tippy>
        </p>
      </div>
      <div className={cx("promotion-btn")}>
        <Button
          label={"Select or enter Promotion"}
          styles={"non-outline"}
          icon={faReceipt}
        />
      </div>
    </div>
  );
}

export default Promotion;
