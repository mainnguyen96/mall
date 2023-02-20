import classNames from "classnames/bind";

import styles from "./AccountPage.module.css";

const cx = classNames.bind(styles);

function AccountPage({ header, children }) {
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("header")}>{header}</h2>
      {children}
    </div>
  );
}

export default AccountPage;
