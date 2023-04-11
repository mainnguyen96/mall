import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";

import styles from "./AccountItemList.module.css";

const cx = classNames.bind(styles);

function AccountItem({ data, size, type, htmlFor }) {
  return (
    <div className={cx("item", type)}>
      <FontAwesomeIcon icon={data.icon} className={cx("icon", size)} />{" "}
      <label htmlFor={htmlFor}>{data.label}</label>
    </div>
  );
}

export default AccountItem;
