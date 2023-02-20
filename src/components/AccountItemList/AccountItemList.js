import classNames from "classnames/bind";
import {
  faBell,
  faEye,
  faFaceSmile,
  faFileInvoiceDollar,
  faLocationDot,
  faMoneyBillTransfer,
  faRectangleList,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import AccountItem from "./AccountItem";
import styles from "./AccountItemList.module.css";

const cx = classNames.bind(styles);
const menu = [
  {
    icon: faUser,
    label: "Account Infomation",
  },
  {
    icon: faBell,
    label: "My notice",
  },
  {
    icon: faRectangleList,
    label: "Order Management",
  },
  {
    icon: faMoneyBillTransfer,
    label: "Payment Management",
  },
  {
    icon: faLocationDot,
    label: "Address",
  },
  {
    icon: faFileInvoiceDollar,
    label: "Billing Infomation",
  },
  {
    icon: faFaceSmile,
    label: "Product Reviews",
  },
  {
    icon: faEye,
    label: "Product View",
  },
];

function AccountItemList() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <img
          src="https://lh5.googleusercontent.com/-BGbVNgJFryw/AAAAAAAAAAI/AAAAAAAAAjk/C2iOlUOhQfA/photo.jpg"
          alt="account avatar"
          className={cx("avatar")}
        />
        <div className={cx("name")}>
          <p>Account of</p>
          <h4>Duc Chinh Nguyen</h4>
        </div>
      </div>
      <ul className={cx("item-list")}>
        {menu &&
          menu.map((item, index) => (
            <li key={index}>
              <AccountItem data={item} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AccountItemList;
