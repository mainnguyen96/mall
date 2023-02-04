import { useState, useEffect } from "react";
import classNames from "classnames/bind";

import { getData } from "~/firebaseServices/firebaseServices";
import TemplePage from "../TemplePage";
import ProductList from "~/components/ProductList";
import ProductCate from "~/components/ProductCate";
import SideBar from "~/components/SideBar";
import Modal from "~/components/Modal";
import styles from "./Home.module.css";

const cx = classNames.bind(styles);

function Home() {
  const [products, setProducts] = useState();
  const [showSideBar, setShowSideBar] = useState(false);
  useEffect(() => {
    getData("products").then((data) => {
      setProducts(Object.values(data));
    });
  }, []);
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
      {products && <ProductList products={products} />}
    </TemplePage>
  );
}

export default Home;
