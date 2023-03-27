import { useEffect, useState } from "react";
import { FixedSizeList } from "react-window";
import classNames from "classnames/bind";

import ProductList from "../ProductList";
import styles from "./ProductView.module.css";

const cx = classNames.bind(styles);

const NUMBER_PRODUCTS_IN_LIST = 12;

function ProductView({ products }) {
  const [productRow, setProductRow] = useState([]);
  useEffect(() => {
    const rowData = [];
    for (let i = 0; i < products.length / NUMBER_PRODUCTS_IN_LIST; i++) {
      rowData[i] = products.slice(
        NUMBER_PRODUCTS_IN_LIST * i,
        NUMBER_PRODUCTS_IN_LIST * i + NUMBER_PRODUCTS_IN_LIST
      );
    }
    setProductRow(rowData);
  }, [products]);

  const Row = ({ index, style }) => (
    <ProductList style={style} products={productRow[index]} />
  );

  return (
    <FixedSizeList
      itemCount={productRow.length}
      className={cx("wrapper")}
      height={580}
      itemSize={1}
    >
      {Row}
    </FixedSizeList>
  );
}

export default ProductView;
