import { Field } from "formik";
import classNames from "classnames/bind";

import SideBarRadio from "../SideBarRadio";
import styles from "./SidebarFilter.module.css";

const cx = classNames.bind(styles);

function SidebarFilter({ rate, maxPrice, minPrice }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("reviews")}>
        <div className={cx("label")}>{"Rating"}</div>
        {[5, 4, 3, 2].map((item, index) => (
          <SideBarRadio key={index} id={`item${item}`} name={rate} value={item}>
            from {item} stars
          </SideBarRadio>
        ))}
      </div>
      <div className={cx("prices")}>
        <div className={cx("label")}>{"Price"}</div>
        <div className={cx("price-input")}>
          <Field name={minPrice} type={"number"} className={cx("input")} />
          <p className={cx("mid-line")}>to</p>
          <Field name={maxPrice} type={"number"} className={cx("input")} />
        </div>
        <button type="submit" className={cx("price-btn")}>
          Apply
        </button>
      </div>
    </div>
  );
}

export default SidebarFilter;
