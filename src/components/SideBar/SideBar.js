import classNames from "classnames/bind";

import styles from "./SideBar.module.css";

const cx = classNames.bind(styles);

function SideBar({ isShow, children }) {
  return <div className={cx("wrapper", isShow && "show")}>{children}</div>;
}

export default SideBar;
