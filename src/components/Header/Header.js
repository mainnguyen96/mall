import classNames from "classnames/bind";
import {
  faBell,
  faCartShopping,
  faMessage,
  faLocationDot,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

import logo from "~/assets/images/logo.png";
import Button from "../Button";
import Search from "../Search";
import SearchCategory from "../SearchCategory";
import styles from "./Header.module.css";

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx("wrapper")}>
      <img className={cx("logo")} src={logo} alt="logo" />
      <div className={cx("search")}>
        <Search />
        <SearchCategory />
      </div>
      <div className={cx("nav")}>
        <ul className={cx("function")}>
          <li className={cx("func-item")}>
            <Button label={"Notify"} icon={faBell} />
          </li>
          <li className={cx("func-item")}>
            <Button label={"Message"} icon={faMessage} />
          </li>
          <li className={cx("func-item")}>
            <Button label={"Cart"} icon={faCartShopping} />
          </li>
          <li className={cx("func-item")}>
            <Button label={"Me"} icon={faUserCircle} />
          </li>
        </ul>
        <Button
          type={"grey"}
          label={"Deliver to"}
          location={"Viet Nam"}
          icon={faLocationDot}
        />
      </div>
    </header>
  );
}

export default Header;
