import classNames from "classnames/bind";
import { useField } from "formik";

import styles from "./SelectForm.module.css";

const cx = classNames.bind(styles);

function SelectForm({ ...props }) {
  const [field, meta] = useField({ ...props, type: "select" });
  return <select {...field} {...props} className={cx("select")} />;
}

export default SelectForm;
