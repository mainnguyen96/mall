import { useState, useEffect } from "react";
import classNames from "classnames/bind";

import { getData } from "~/firebaseServices/firebaseServices";
import TemplePage from "../TemplePage";
import ProductList from "~/components/ProductList";
import ProductCate from "~/components/ProductCate";
import SideBar from "~/components/SideBar";
import Modal from "~/components/Modal";
import SideBarItem from "~/components/SideBar/SideBarItem";
import styles from "./Home.module.css";

const cx = classNames.bind(styles);

function Home() {
  const [products, setProducts] = useState();
  const [outstanding, setOutstanding] = useState(null);
  const [category, setCategory] = useState(null);
  const [showSideBar, setShowSideBar] = useState(false);
  useEffect(() => {
    getData("products").then((data) => {
      setProducts(Object.values(data));
    });
    getData("category").then((data) => {
      setCategory(data);
    });
    getData("outstanding").then((data) => {
      setOutstanding(data);
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
      <SideBar isShow={showSideBar}>
        {outstanding && (
          <SideBarItem label={"Outstanding"} items={outstanding} />
        )}
        {category && <SideBarItem label={"Category"} items={category} />}
      </SideBar>
      <ProductCate />
      {products && <ProductList products={products} />}
    </TemplePage>
  );
}

export default Home;
