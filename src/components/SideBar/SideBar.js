import classNames from "classnames/bind";

import SideBarItem from "../SideBarItem";
import styles from "./SideBar.module.css";

const cx = classNames.bind(styles);

function SideBar() {
  return (
    <div className={cx("wrapper")}>
      <SideBarItem label={"Outstanding"} />
    </div>
  );
}

export default SideBar;
