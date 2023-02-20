import classNames from "classnames/bind";
import SearchItem from "./SearchItem";
import { useSelector } from "react-redux";
import { selectAllProducts } from "~/features/productsSlice";

import styles from "./SearchList.module.css";

const cx = classNames.bind(styles);

function SearchList({}) {
  const products = useSelector(selectAllProducts);
  return (
    <ul className={cx("list-wrapper")}>
      {products && products.map(product => (
        <li key={product.id} className={cx("item")}>
          <SearchItem
          name={product.name}
          sold={product.sold}
          img={
            product.img[0]
          }
        />
        </li>
      ))}
    </ul>
  );
}

export default SearchList;
