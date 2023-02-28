import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import styles from "./LoginForm.module.css";

const cx = classNames.bind(styles);

function LoginForm({ form, onClose }) {
  return (
    <div className={cx("form-wrapper")}>
      <button onClick={onClose} className={cx("close-btn")}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      {form}
      <div className={cx("img-content")}>
        <img
          className={cx("image")}
          src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png"
          alt="login"
        />
        <h3 className={cx("img-desc1")}>Shopping at Mall</h3>
        <p className={cx("img-desc2")}>Super deals every day</p>
      </div>
    </div>
  );
}

export default LoginForm;
