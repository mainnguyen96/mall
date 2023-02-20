import classNames from "classnames/bind";

import styles from "./NotFound.module.css";

const cx = classNames.bind(styles);

function NotFound() {
  return (
    <div className={cx("wrapper")}>
      <img
        className={cx("image")}
        src="https://assets.website-files.com/5f5298baab4c43a7f0640b67/605b9f602d9443c4a361fc9f_es_types_6.png"
        alt="nothing search"
      />
    </div>
  );
}

export default NotFound;
