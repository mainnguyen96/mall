import classNames from "classnames/bind";

import styles from "./FooterSection.module.css";

const cx = classNames.bind(styles);

function FooterSection({ header }) {
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("header")}>Customer support</h3>
      <ul className={cx("list")}>
        <li className={cx("item")}>
          Hotline: 1900-6035 (1000 VND/minute, 8-21 hours including Saturday and
          Sunday)
        </li>
        <li className={cx("item")}>frequently asked Questions</li>
        <li className={cx("item")}>Submit a support request</li>
        <li className={cx("item")}>Ordering guide</li>
      </ul>
    </div>
  );
}

export default FooterSection;
