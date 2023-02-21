import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faReceipt } from "@fortawesome/free-solid-svg-icons";

import Promotion from "~/components/Promotion";
import Location from "~/components/Location";
import Button from "~/components/Button";
import styles from "./Bill.module.css";

const cx = classNames.bind(styles);

function Bill() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("cost")}>
        <div className={cx("price")}>
          <p className={cx("price-label")}>Provisional</p>
          <p className={cx("price-number")}>85292000</p>
        </div>
        <div className={cx("total")}>
          <p className={cx("total-label")}>Total amount</p>
          <p className={cx("total-number")}>85292000</p>
        </div>
        <div className={cx("vat")}>(VAT included)</div>
      </div>
      <div className={cx("purchase")}>
        <Button label={"Purchase (4)"} />
      </div>
    </div>
  );
}

export default Bill;
