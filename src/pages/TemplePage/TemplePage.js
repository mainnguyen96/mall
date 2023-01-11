import classNames from "classnames/bind";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/fontawesome-free-regular";

import Footer from "~/components/Footer";
import Header from "~/components/Header/Header";
import WidgetButton from "~/components/WidgetButton";
import styles from "./TemplePage.module.css";

const cx = classNames.bind(styles);

function TemplePage({ children, handleShowSideBar }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("menu-btn")}>
        <WidgetButton onClick={() => handleShowSideBar(true)} icon={faBars} />
      </div>
      <div className={cx("content")}>{children}</div>
      <div className={cx("mess-btn")}>
        <WidgetButton icon={faCommentDots} />
      </div>
      <Footer />
    </div>
  );
}

export default TemplePage;
