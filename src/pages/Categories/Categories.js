import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";

import { getData } from "~/firebaseServices/firebaseServices";
import TemplePage from "../TemplePage";
import SidebarFilterItem from "~/components/SideBar/SidebarFilterItem";
import ProductList from "~/components/ProductList";
import Modal from "~/components/Modal";
import SideBar from "~/components/SideBar";
import styles from "./Categories.module.css";

const cx = classNames.bind(styles);

function Categories() {
  const [products, setProducts] = useState();
  const [showSideBar, setShowSideBar] = useState(false);
  const [filterSidebar, setFilterSidebar] = useState();
  const params = useParams();
  useEffect(() => {
    getData("products", "category", params.path).then((data) => {
      setProducts(Object.values(data));
    });
    getData("filterSidebar", "category", params.path).then((data) => {
      setFilterSidebar(Object.values(data));
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
        {filterSidebar &&
          filterSidebar.map((filter) => (
            <li key={filter.criteria} className={cx("filter-item")}>
              <SidebarFilterItem
                filter={filter.filter}
                label={filter.criteria}
              />
            </li>
          ))}
      </SideBar>
      {products && <ProductList products={products} />}
    </TemplePage>
  );
}

export default Categories;
