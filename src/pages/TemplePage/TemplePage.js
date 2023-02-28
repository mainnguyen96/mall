import { useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/fontawesome-free-regular";
import classNames from "classnames/bind";

import { useDispatch, useSelector } from "react-redux";
import { authNeedSet, selectNeedAuth } from "~/features/authSlice";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import WidgetButton from "~/components/WidgetButton";
import Modal from "~/components/Modal";
import LoginForm from "~/components/LoginForm";
import Login from "~/components/LoginForm/Login";
import Delivery from "~/components/Delivery";
import styles from "./TemplePage.module.css";

const cx = classNames.bind(styles);

function TemplePage({ children, handleShowSideBar, showSidebar = true }) {
  const dispatch = useDispatch();
  const showLoginForm = useSelector(selectNeedAuth);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);

  return (
    <div className={cx("wrapper")}>
      <Header
        onAuthClick={() => dispatch(authNeedSet(true))}
        onDeliveryClick={() => setShowDeliveryForm(true)}
      />
      {showLoginForm && (
        <div className={cx("auth")}>
          <Modal />
          <div className={cx("form")}>
            <LoginForm
              onClose={() => dispatch(authNeedSet(false))}
              form={<Login onAuth={() => dispatch(authNeedSet(false))} />}
            ></LoginForm>
          </div>
        </div>
      )}
      {showDeliveryForm && (
        <div className={cx("delivery")}>
          <Modal />
          <div className={cx("form")}>
            <Delivery />
          </div>
        </div>
      )}
      {showSidebar && (
        <div className={cx("menu-btn")}>
          <WidgetButton onClick={() => handleShowSideBar(true)} icon={faBars} />
        </div>
      )}
      <div className={cx("content")}>{children}</div>
      <div className={cx("mess-btn")}>
        <WidgetButton icon={faCommentDots} />
      </div>
      <Footer />
    </div>
  );
}

export default TemplePage;
