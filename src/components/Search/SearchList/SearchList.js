import classNames from "classnames/bind";
import SearchItem from "./SearchItem";

import styles from "./SearchList.module.css";

const cx = classNames.bind(styles);

function SearchList({}) {
  return (
    <ul className={cx("list-wrapper")}>
      <li className={cx("item")}>
        <SearchItem
          name={"Huggies"}
          num={789}
          img={
            "https://vcdn.tikicdn.com/cache/100x100/ts/seller/c0/82/ff/53085855a167516752394b2eed1c44a2.jpg"
          }
        />
      </li>
      <li className={cx("item")}>
        <SearchItem
          name={"Huggies"}
          num={789}
          img={
            "https://vcdn.tikicdn.com/cache/100x100/ts/seller/c0/82/ff/53085855a167516752394b2eed1c44a2.jpg"
          }
        />
      </li>
      <li className={cx("item")}>
        <SearchItem
          name={"Huggies"}
          num={789}
          img={
            "https://vcdn.tikicdn.com/cache/100x100/ts/seller/c0/82/ff/53085855a167516752394b2eed1c44a2.jpg"
          }
        />
      </li>
      <li className={cx("item")}>
        <SearchItem
          name={"Huggies"}
          num={789}
          img={
            "https://vcdn.tikicdn.com/cache/100x100/ts/seller/c0/82/ff/53085855a167516752394b2eed1c44a2.jpg"
          }
        />
      </li>
      <li className={cx("item")}>
        <SearchItem
          name={"Huggies"}
          num={789}
          img={
            "https://vcdn.tikicdn.com/cache/100x100/ts/seller/c0/82/ff/53085855a167516752394b2eed1c44a2.jpg"
          }
        />
      </li>
    </ul>
  );
}

export default SearchList;
