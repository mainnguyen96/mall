import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
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
import SidebarFilter from "~/components/SideBar/SidebarFilter";
import Loading from "~/components/Loading";
import NotFound from "~/components/NotFound";
import styles from "./Categories.module.css";

const cx = classNames.bind(styles);

function Categories() {
  const [showSideBar, setShowSideBar] = useState(false);
  const products = useSelector(selectAllProducts);
  const productsStatus = useSelector((state) => state.cateProducts.status);
  const filterSidebar = useSelector(selectFilterSidebar);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchCateProducts(params.path));
    dispatch(fetchFilterSidebar(params.path));
  }, [dispatch, params.path]);

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
              {filterSidebar?.map((filter) => (
                <SidebarFilterItem
                  key={filter.data.criteria}
                  filter={filter.data.filters}
                  label={filter.data.name}
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
