import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";

import { getData } from "~/firebaseServices/firebaseServices";
import TemplePage from "../TemplePage";
import SidebarFilterItem from "~/components/SidebarFilterItem";
import ProductList from "~/components/ProductList";
import styles from "./Categories.module.css";

const cx = classNames.bind(styles);

function Categories() {
  const [products, setProducts] = useState();
  const params = useParams();
  useEffect(() => {
    getData("products", "category", params.path).then((data) => {
      console.log("category data:", data);
      setProducts(Object.values(data));
    });
  }, []);
  return (
    <TemplePage>
      {/* <SidebarFilterItem /> */}
      {products && <ProductList products={products} />}
    </TemplePage>
  );
}

export default Categories;
