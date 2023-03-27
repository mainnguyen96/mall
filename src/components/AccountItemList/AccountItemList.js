import { NavLink } from "react-router-dom";
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
import classNames from "classnames/bind";

import AccountItem from "./AccountItem";
import styles from "./AccountItemList.module.css";
import AccountImage from "../Image/AccountImage";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/authSlice";

const cx = classNames.bind(styles);
const menu = [
  {
    icon: faUser,
    label: "Account Infomation",
    path: "/user/account",
  },
  {
    icon: faBell,
    label: "My notice",
    path: "/user/notice",
  },
  {
    icon: faRectangleList,
    label: "Order Management",
    path: "/user/order",
  },
  {
    icon: faMoneyBillTransfer,
    label: "Payment Management",
    path: "/payment",
  },
  {
    icon: faLocationDot,
    label: "Address",
    path: "/address",
  },
  {
    icon: faFileInvoiceDollar,
    label: "Billing Infomation",
    path: "/bill",
  },
  {
    icon: faFaceSmile,
    label: "Product Reviews",
    path: "/review",
  },
  {
    icon: faEye,
    label: "Product View",
    path: "/product",
  },
];

function AccountItemList() {
  const auth = useSelector(selectAuth);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <AccountImage
          src={auth.userImage}
          alt="account avatar"
          className={cx("avatar")}
        />
        <div className={cx("name")}>
          <p>Account of</p>
          <h4>{auth.userName}</h4>
        </div>
      </div>
      <ul className={cx("item-list")}>
        {menu &&
          menu.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                cx(isActive ? "active" : "inactive", "item-link")
              }
            >
              <AccountItem data={item} />
            </NavLink>
          ))}
      </ul>
    </div>
  );
}

export default AccountItemList;
