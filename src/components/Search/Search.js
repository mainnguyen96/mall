import { useRef } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styles from "./Search.module.css";
import SearchList from "./SearchList/SearchList";

const cx = classNames.bind(styles);

function Search() {
  const inputRef = useRef();
  
  return (
    <div className={cx("wrapper")}>
      <div className={cx('search-bar')}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx("icon")} />
        <input
          ref={inputRef}
          type="text"
          placeholder="What are you looking for today?"
          className={cx("text")}
        />
  
        <button className={cx("button")}>Search</button>
      </div>
     {false &&  <div className={cx('search-list')}><SearchList/></div>}
    </div>
  );
}

export default Search;
