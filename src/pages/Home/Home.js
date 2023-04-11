import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";

import { selectAllProducts, fetchProducts } from "~/features/productsSlice";
import TemplePage from "../TemplePage";
import ProductCate from "~/components/ProductCate";
import SideBar from "~/components/SideBar";
import Modal from "~/components/Modal";
import SideBarItem from "~/components/SideBar/SideBarItem";
import Loading from "~/components/Loading";
import NotFound from "~/components/NotFound";
import styles from "./Home.module.css";
import ProductView from "~/components/ProductView/ProductView";
import {
  fetchCateData,
  selectCategory,
  selectOutStanding,
} from "~/features/categorySlice";

const cx = classNames.bind(styles);

function Home() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const productsStatus = useSelector((state) => state.products.status);
  const category = useSelector(selectCategory);
  const outstanding = useSelector(selectOutStanding);
  const [showSideBar, setShowSideBar] = useState(false);
  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch]);

  useEffect(() => {
    dispatch(fetchCateData());
  }, [dispatch]);

  const handleShowSideBar = (isShow) => {
    setShowSideBar(isShow);
  };

  let productsElement;
  if (productsStatus === "loading") {
    productsElement = <Loading />;
  } else if (productsStatus === "succeeded") {
    productsElement = <ProductView products={products} />;
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
