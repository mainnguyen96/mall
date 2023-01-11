import classNames from "classnames/bind";
import { useState } from "react";

import ProductList from "~/components/ProductList";
import TemplePage from "../TemplePage";
import ProductCate from "~/components/ProductCate";
import styles from "./Home.module.css";
import LoginForm from "~/components/LoginForm";
import Login from "~/components/LoginForm/Login/Login";
import Verify from "~/components/LoginForm/Verify";
import Password from "~/components/LoginForm/Password";
import SideBar from "~/components/SideBar";
import Modal from "~/components/Modal";

const cx = classNames.bind(styles);

function Home() {
  const [showSideBar, setShowSideBar] = useState(false);
  const handleShowSideBar = (isShow) => {
    setShowSideBar(isShow);
  };
  return (
    <TemplePage handleShowSideBar={handleShowSideBar}>
      {showSideBar && (
        <>
          <Modal onClick={() => handleShowSideBar(false)}></Modal>
        </>
      )}
      <SideBar isShow={showSideBar}></SideBar>
      <ProductCate />
      <ProductList />
    </TemplePage>
  );
}

export default Home;
