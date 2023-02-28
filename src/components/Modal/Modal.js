import classNames from "classnames/bind";

import styles from "./Modal.module.css";

const cx = classNames.bind(styles);

function Modal({ onClick }) {
  return <div onClick={onClick} className={cx("wrapper")}></div>;
}

export default Modal;
