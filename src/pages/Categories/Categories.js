import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import classNames from "classnames/bind";

import {
  fetchCateProducts,
  fetchFilterProducts,
  fetchFilterSidebar,
  selectAllProducts,
  selectFilterSidebar,
} from "~/features/cateProductsSlice";
import TemplePage from "../TemplePage";
import SidebarFilterItem from "~/components/SideBar/SidebarFilterItem";
import ProductList from "~/components/ProductList";
import Modal from "~/components/Modal";
import SideBar from "~/components/SideBar";
import styles from "./Categories.module.css";
import SidebarFilter from "~/components/SideBar/SidebarFilter";
import Loading from "~/components/Loading";
import NotFound from "~/components/NotFound";

const cx = classNames.bind(styles);

function Categories() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const productsStatus = useSelector((state) => state.cateProducts.status);
  const filterSidebar = useSelector(selectFilterSidebar);
  const [showSideBar, setShowSideBar] = useState(false);
  const params = useParams();
  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchCateProducts(params.path));
    }
    dispatch(fetchFilterSidebar(params.path));
  }, [dispatch, productsStatus, params.path]);
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
        <Formik
          initialValues={{
            rate: "",
            minPrice: "",
            maxPrice: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            dispatch(fetchFilterProducts({ cate: params.path, ...values }));
          }}
          className={cx("filter-item")}
        >
          {(formik) => (
            <Form onChangeCapture={() => formik.handleSubmit()}>
              <SidebarFilter
                rate={"rate"}
                minPrice={"minPrice"}
                maxPrice={"maxPrice"}
              />
              {filterSidebar &&
                filterSidebar.map((filter) => (
                  <SidebarFilterItem
                    key={filter.criteria}
                    filter={filter.filters}
                    label={filter.name}
                  />
                ))}
            </Form>
          )}
        </Formik>
      </SideBar>
      {productsElement}
    </TemplePage>
  );
}

export default Categories;
