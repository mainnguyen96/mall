import classNames from "classnames/bind";
import { useRef } from "react";
import { useField } from "formik";

import StarBar from "~/components/Product/ProductReviewList/StarBar/StarBar";
import styles from "./SideBarRadio.module.css";

const cx = classNames.bind(styles);

function SideBarRadio({ children, ...props }) {
  const [field, meta] = useField(props);
  const radioRef = useRef(null);
  const radioCheck = radioRef.current && radioRef.current.checked;
  return (
    <button type="button" className={cx("wrapper", radioCheck && "checked")}>
      <label htmlFor={props.id || props.name} className={cx("label")}>
        <input ref={radioRef} type="radio" {...field} {...props} />
        <div className={cx("icon")}>
          <StarBar size={"small"} rate={props.value} />
        </div>
        {children}
      </label>
    </button>
  );
}

export default SideBarRadio;
