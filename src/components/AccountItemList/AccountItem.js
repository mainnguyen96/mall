import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./AccountItemList.module.css";

const cx = classNames.bind(styles);

function AccountItem({ data, size, type }) {
  return (
    <div className={cx("item", type)}>
      <FontAwesomeIcon icon={data.icon} className={cx("icon", size)} />{" "}
      {data.label}
    </div>
  );
}

export default AccountItem;
