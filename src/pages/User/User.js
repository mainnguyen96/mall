import classNames from "classnames/bind";
import AccountInfo from "~/components/Account/AccountInfo/AccountInfo";
import AccountNotice from "~/components/Account/AccountNotice";
import AccountPage from "~/components/Account/AccountPage/AccountPage";
import Order from "~/components/Account/Order";
import AccountItemList from "~/components/AccountItemList/AccountItemList";
import TemplePage from "../TemplePage";

import styles from "./User.module.css";

const cx = classNames.bind(styles);

function User() {
  return (
    <TemplePage showSidebar={false}>
      <div className={cx("wrapper")}>
        <AccountItemList />
        {/* <AccountInfo /> */}
        <Order/>
      </div>
    </TemplePage>
  );
}

export default User;
