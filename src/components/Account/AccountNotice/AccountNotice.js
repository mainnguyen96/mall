import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faClockRotateLeft,
  faEllipsisVertical,
  faGift,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import AccountPage from "../AccountPage/AccountPage";
import styles from "./AccountNotice.module.css";

const cx = classNames.bind(styles);

const noticeMenu = [
  {
    icon: faHouse,
    label: "General Notifications",
  },
  {
    icon: faGift,
    label: "Promotion Notifications",
  },
  {
    icon: faClipboardList,
    label: "Order Notifications",
  },
  {
    icon: faClockRotateLeft,
    label: "System Notifications",
  },
];

function AccountNotice() {
  return (
    <AccountPage header={"My Notifications"}>
      <div className={cx("wrapper")}>
        <div className={cx("nav")}>
          <ul className={cx("nav-menu")}>
            {noticeMenu.map((menu, index) => (
              <li key={index} className={cx("menu-item")}>
                <FontAwesomeIcon icon={menu.icon} />
              </li>
            ))}
            <li className={cx("setting")}>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </li>
          </ul>
        </div>
      </div>
    </AccountPage>
  );
}

export default AccountNotice;
