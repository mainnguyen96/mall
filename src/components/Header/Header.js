import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import {
  faBell,
  faCartShopping,
  faLocationDot,
  faUserCircle,
  faGlobe,
  faXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import { signOut, getAuth } from "firebase/auth";
import { selectAuth, selectUserLocation } from "~/features/authSlice";
import {
  fetchProducts,
  selectShowCartTippy,
  setShowCartTippy,
} from "~/features/productsSlice";
import BarItem from "../BarItem";
import Search from "../Search";
import config from "../../config";
import logo from "~/assets/images/logo.png";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";

const cx = classNames.bind(styles);

const mainMenu = [
  { label: "Notify", path: "/user/notice", icon: faBell },
  { label: "English", path: "", icon: faGlobe },
  { label: "Cart", path: "/cart", icon: faCartShopping },
  { label: "Account", path: "", icon: faUserCircle },
];

const accountMenu = [
  { label: "Account Information", path: "/user/account" },
  { label: "My Orders", path: "/user/order" },
  { label: "Log out", path: "logout" },
];

function Header({ onAuthClick, onDeliveryClick }) {
  const showCartTippy = useSelector(selectShowCartTippy);
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const userLocation = useSelector(selectUserLocation);
  const navigate = useNavigate();
  const reloadProduct = () => {
    dispatch(fetchProducts());
  };
  const handleMenuClick = (path) => {
    if (path) {
      navigate(path);
    }
  };
  const handleAccountMenuClick = (menu) => {
    if (menu === "logout") {
      const auth = getAuth();
      signOut(auth).then(() => {
        window.location.reload();
      });
    } else {
      navigate(menu);
    }
  };
  const AccountMenu = (
    <ul className={cx("account-menu")}>
      {accountMenu.map((menu, index) => (
        <li onClick={() => handleAccountMenuClick(menu.path)} key={index}>
          {menu.label}
        </li>
      ))}
    </ul>
  );
  const AccountItem = ({ menu }) => (
    <Tippy content={auth.auth ? AccountMenu : null} interactive={true}>
      <li
        onClick={!auth.auth ? onAuthClick : null}
        className={cx("func-item", "account")}
      >
        <BarItem
          label={auth.auth ? auth.userName : menu.label}
          icon={menu.icon}
        />
      </li>
    </Tippy>
  );
  const CartTippy = () => {
    const handleViewClick = () => {
      dispatch(setShowCartTippy(false));
      navigate("/cart");
    };
    if (true) {
      return (
        <div className={cx("cart-tippy")}>
          <FontAwesomeIcon
            onClick={() => dispatch(setShowCartTippy(false))}
            className={cx("cart-close")}
            icon={faXmark}
          />
          <label className={cx("cart-label")}>
            <FontAwesomeIcon
              className={cx("cart-check")}
              icon={faCircleCheck}
            />
            Add to cart successfully!
          </label>
          <Button
            onClick={handleViewClick}
            size={"small"}
            label={"View cart and checkout"}
          />
        </div>
      );
    }
  };
  return (
    <div className={cx("background")}>
      <header className={cx("wrapper")}>
        <Link to={config.routes.home} onClick={reloadProduct}>
          <img className={cx("logo")} src={logo} alt="logo" />
        </Link>
        <div className={cx("search")}>
          <Search />
        </div>
        <div className={cx("nav")}>
          <ul className={cx("function")}>
            {mainMenu.map((menu, index) =>
              menu.label !== "Account" ? (
                <div key={index}>
                  <Tippy
                    content={menu.label === "Cart" ? <CartTippy /> : null}
                    interactive={true}
                    visible={showCartTippy}
                  >
                    <li
                      onClick={() => handleMenuClick(menu.path)}
                      className={cx("func-item")}
                    >
                      <BarItem label={menu.label} icon={menu.icon} />
                    </li>
                  </Tippy>
                </div>
              ) : (
                <AccountItem key={index} menu={menu} />
              )
            )}
          </ul>
          <BarItem
            onClick={onDeliveryClick}
            type={"grey"}
            label={"Deliver to"}
            location={
              userLocation ? userLocation.label : "Please choose a location"
            }
            icon={faLocationDot}
          />
        </div>
      </header>
    </div>
  );
}

export default Header;
