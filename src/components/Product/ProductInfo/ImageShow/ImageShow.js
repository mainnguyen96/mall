import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./ImageShow.module.css";

const cx = classNames.bind(styles);

function ImageShow({ imgs }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    setImage(imgs[0]);
  }, [imgs]);

  return (
    <div className={cx("wrapper")}>
      <img className={cx("main-img")} alt="product" src={image} />
      <ul className={cx("img-list")}>
        {imgs.map((image) => (
          <li key={image} onClick={() => setImage(image)}>
            <img className={cx("other-img")} alt="product" src={image} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImageShow;
