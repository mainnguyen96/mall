import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";

import { getData } from "~/firebaseServices/firebaseServices";
import TemplePage from "../TemplePage";
import ProductList from "~/components/ProductList";
import ProductCate from "~/components/ProductCate";
import SideBar from "~/components/SideBar";
import Modal from "~/components/Modal";
import SideBarItem from "~/components/SideBar/SideBarItem";
import { selectAllProducts, fetchProducts } from "~/features/productsSlice";
import store from "~/features/store";
import Loading from "~/components/Loading";
import styles from "./Home.module.css";
import NotFound from "~/components/NotFound";
import Star from "~/components/Star";

const cx = classNames.bind(styles);

function Home() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const productsStatus = useSelector((state) => state.products.status);
  const [outstanding, setOutstanding] = useState(null);
  const [category, setCategory] = useState(null);
  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }

    getData("category").then((data) => {
      setCategory(data);
    });
    getData("outstanding").then((data) => {
      setOutstanding(data);
    });
  }, [productsStatus, dispatch]);
  const handleShowSideBar = (isShow) => {
    setShowSideBar(isShow);
  };

  let productsElement;
  if (productsStatus === "loading") {
    productsElement = <Loading />;
  } else if (productsStatus === "succeeded") {
    productsElement = <ProductList products={products} />;
  } else {
    productsElement = <NotFound />;
  }


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
      {productsElement}
    </TemplePage>
  );
}

export default Home;
