import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styles from "./Search.module.css";

const cx = classNames.bind(styles);

function Search() {
  return (
    <div className={cx("wrapper")}>
      <FontAwesomeIcon icon={faMagnifyingGlass} className={cx("icon")} />
      <input
        type="text"
        placeholder="What are you looking for today?"
        className={cx("text")}
      />
      <button className={cx("button")}>Search</button>
    </div>
  );
}

export default Search;
