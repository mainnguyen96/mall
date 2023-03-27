import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import AccountInfo from "~/components/Account/AccountInfo";
import AccountNotice from "~/components/Account/AccountNotice";
import Order from "~/components/Account/Order";
import AccountItemList from "~/components/AccountItemList";
import { routes } from "~/config/routes";
import TemplePage from "../TemplePage";
import styles from "./User.module.css";
import OrderDetail from "~/components/Account/Order/OrderDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectAuth } from "~/features/authSlice";

const cx = classNames.bind(styles);

function User() {
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuth());
    if (!auth.auth) {
      navigate(routes.home);
    }
  }, [auth.auth, navigate, dispatch]);
  return (
    <TemplePage showSidebar={false}>
      <div className={cx("wrapper")}>
        <AccountItemList />
        <Routes>
          <Route path="/account" element={<AccountInfo />} />
          <Route path="/order" element={<Order />} />
          <Route path="/notice" element={<AccountNotice />} />
          <Route path="/order-detail" element={<OrderDetail />} />
        </Routes>
      </div>
    </TemplePage>
  );
}

export default User;
