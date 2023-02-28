import { useField } from "formik";
import classNames from "classnames/bind";

import styles from "./RadionForm.module.css";

const cx = classNames.bind(styles);

function RadioForm({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <label className={cx("label")}>
      <input type={"radio"} {...field} {...props} className={cx("input")} />
      {label}
    </label>
  );
}

export default RadioForm;
