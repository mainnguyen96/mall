import { useField } from "formik";
import classNames from "classnames/bind";

import styles from "./SelectForm.module.css";

const cx = classNames.bind(styles);

function SelectForm({ size, ...props }) {
  const [field, meta] = useField({ ...props, type: "select" });
  return <select {...field} {...props} className={cx("select", size)} />;
}

export default SelectForm;
