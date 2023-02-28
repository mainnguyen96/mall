import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import { fetchProducts } from "~/features/productsSlice";
import styles from "./SearchList.module.css";

const cx = classNames.bind(styles);

const searchHistory = ["iphone", "samsung"];

function SearchList({}) {
  const dispatch = useDispatch();
  const handleClickHistory = (data) => {
    dispatch(fetchProducts(data));
    console.log("click");
  };
  return (
    <ul className={cx("list-wrapper")}>
      {searchHistory &&
        searchHistory.map((history) => (
          <li
            onClick={() => handleClickHistory(history)}
            key={history}
            className={cx("item")}
          >
            <FontAwesomeIcon
              className={cx("item-icon")}
              icon={faClockRotateLeft}
            />
            {history}
          </li>
        ))}
    </ul>
  );
}

export default SearchList;
