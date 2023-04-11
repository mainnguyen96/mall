import classNames from "classnames/bind";

import styles from "./MobileView.module.css";

const cx = classNames.bind(styles);

function MobileView() {
  return (
    <div className={cx("wrapper")}>
      <p>Sorry!!!</p>
      <p>Please use desktop browser for this app</p>
    </div>
  );
}

export default MobileView;
