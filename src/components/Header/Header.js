import classNames from "classnames/bind";
import {
  faBell,
  faCartShopping,
  faLocationDot,
  faUserCircle,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

import logo from "~/assets/images/logo.png";
import BarItem from "../BarItem";
import Search from "../Search";
import SearchCategory from "../Search/SearchCategory";
import styles from "./Header.module.css";

const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx("background")}>
      <header className={cx("wrapper")}>
        <img className={cx("logo")} src={logo} alt="logo" />
        <div className={cx("search")}>
          <Search />
          <SearchCategory />
        </div>
        <div className={cx("nav")}>
          <ul className={cx("function")}>
            <li className={cx("func-item")}>
              <BarItem label={"Notify"} icon={faBell} />
            </li>
            <li className={cx("func-item")}>
              <BarItem label={"English"} icon={faGlobe} />
            </li>
            <li className={cx("func-item")}>
              <BarItem label={"Cart"} icon={faCartShopping} />
            </li>
            <li className={cx("func-item")}>
              <BarItem label={"Me"} icon={faUserCircle} />
            </li>
          </ul>
          <BarItem
            type={"grey"}
            label={"Deliver to"}
            location={"Viet Nam"}
            icon={faLocationDot}
          />
        </div>
      </header>
    </div>
  );
}

export default Header;
