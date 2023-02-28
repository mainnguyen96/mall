import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import { selectAuth } from "~/features/authSlice";
import AccountInfo from "~/components/Account/AccountInfo";
import AccountNotice from "~/components/Account/AccountNotice";
import Order from "~/components/Account/Order";
import AccountItemList from "~/components/AccountItemList";
import { routes } from "~/config/routes";
import TemplePage from "../TemplePage";
import styles from "./User.module.css";

const cx = classNames.bind(styles);

function User() {
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.auth) {
      navigate(routes.home);
    }
  });
  return (
    <TemplePage showSidebar={false}>
      <div className={cx("wrapper")}>
        <AccountItemList />
        <Routes>
          <Route path="/account" element={<AccountInfo />} />
          <Route path="/order" element={<Order />} />
          <Route path="/notice" element={<AccountNotice />} />
        </Routes>
      </div>
    </TemplePage>
  );
}

export default User;
