import { useField } from "formik";
import classNames from "classnames/bind";

import styles from "./TextForm.module.css";

const cx = classNames.bind(styles);

function TextForm({ label, icon, ...props }) {
  const [field, meta] = useField(props);
  return (
    <label htmlFor={props.id || props.name} className={cx("label")}>
      {label}
      <input {...field} {...props} className={cx("input")} />
    </label>
  );
}

export default TextForm;
