import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import Button from "~/components/Button";
import styles from "./Password.module.css";

const cx = classNames.bind(styles);

function Password() {
  return (
    <div className={cx("form-content")}>
      <button className={cx("back-btn")}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h2 className={cx("form-desc1")}>Enter password</h2>
      <p className={cx("form-desc2")}>
        Please enter Tiki password of phone number{" "}
        <span className={cx("phone")}>0398289949</span>
      </p>
      <Formik initialValues={{ password: "" }} validate={{}}>
        {(values) => (
          <form className={cx("form")}>
            <input
              className={cx("pass-input")}
              type="password"
              name="password"
              value={values.password}
              placeholder={"PassWord"}
            />
            <Button label={"Log in"} type={"submit"} />
          </form>
        )}
      </Formik>
      <div className={cx("other-method")}>
        <p className={cx("method")}>Forgot password?</p>
        <p className={cx("method")}>Sign in with SMS</p>
      </div>
    </div>
  );
}

export default Password;
