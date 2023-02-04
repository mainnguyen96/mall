import classNames from "classnames/bind";

import styles from "./SidebarFilter.module.css";

const cx = classNames.bind(styles);

function SidebarFilter() {
  return <div className={cx("wrapper")}></div>;
}

export default SidebarFilter;
