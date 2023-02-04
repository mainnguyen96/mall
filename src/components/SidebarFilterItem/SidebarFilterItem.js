import classNames from "classnames/bind";
import { Formik } from "formik";

import styles from "./SidebarFilterItem.module.css";

const cx = classNames.bind(styles);
const data = ["128GB", "32GB", "64GB", "256GB", "16GB", "8GB", "512GB"];

function SidebarFilterItem() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("label")}>ROM</div>
      <Formik>
        {(value) => (
          <form className={cx("form")}>
            {data.map((data) => (
              <label className={cx("item")}>
                <input type="checkbox" className={cx("checkbox")} />
                {data}
              </label>
            ))}
          </form>
        )}
      </Formik>
    </div>
  );
}

export default SidebarFilterItem;
