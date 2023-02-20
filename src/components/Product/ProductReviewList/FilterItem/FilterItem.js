import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useField } from "formik";

import styles from "./FilterItem.module.css";

const cx = classNames.bind(styles);

function FilterItem({ children, ...props }) {
  const [field, meta] = useField(props);
  const inputRef = useRef(null);
  const checked = inputRef.current && (inputRef.current.value === "true");
  return (
    <button className={cx("wrapper", checked && 'checked')} type='button'>
      <label htmlFor={props.id || props.name} className={cx("label")}>
        {checked && (
          <FontAwesomeIcon className={cx("check-icon")} icon={faCheck} />
        )}
        {children}
      </label>
      <input
        ref={inputRef}
        className={cx("checkbox")}
        type={"checkbox"}
        {...field}
        {...props}
      />
    </button>
  );
}

export default FilterItem;
