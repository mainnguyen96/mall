import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

import styles from "./Login.module.css";

const cx = classNames.bind(styles);

function Login() {
  return (
    <div className={cx("form-content")}>
      <h2 className={cx("greeting")}>Hi,</h2>
      <p className={cx("label")}>Log in or create an account</p>
      <Formik initialValues={{ phone: "" }} validate={{}}>
        {(values) => (
          <form className={cx("form")}>
            <input
              className={cx("phone-input")}
              type="number"
              name="phone"
              value={values.phone}
              placeholder={"Phone Number"}
            />
            <button className={cx("phone-submit")} type="submit">
              Continue
            </button>
          </form>
        )}
      </Formik>
      <div className={cx("other-method")}>
        <div className={cx("other-label")}>
          <span className={cx("line")}></span>
          <p>Or continue with</p>
          <span className={cx("line")}></span>
        </div>

        <ul className={cx("method")}>
          <li className={cx("method-icon")}>
            <FontAwesomeIcon icon={faFacebook} />
          </li>
          <li className={cx("method-icon")}>
            <FontAwesomeIcon icon={faGoogle} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Login;
