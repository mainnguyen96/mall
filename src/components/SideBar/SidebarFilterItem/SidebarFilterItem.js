import classNames from "classnames/bind";
import { Field, Formik } from "formik";

import styles from "./SidebarFilterItem.module.css";

const cx = classNames.bind(styles);

function SidebarFilterItem({ filter, label }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("label")}>{label}</div>

      <div className={cx("form")}>
        {filter.map((data) => (
          <label key={data.label} className={cx("item")}>
            <Field id={`${label}:${data.filter}`} name={`${label}:${data.filter}`} type="checkbox" className={cx("checkbox")} />
            {data.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export default SidebarFilterItem;
