import { useState } from "react";
import classNames from "classnames/bind";

import styles from "./ImageShow.module.css";

const cx = classNames.bind(styles);

const imageData = [
  "https://salt.tikicdn.com/cache/750x750/ts/product/7a/09/d5/f3e2c2a7cef8b939cdbcc2e5c9d613ac.jpg.webp",
  "https://salt.tikicdn.com/cache/750x750/ts/product/90/92/b0/2d4a889af1f99c2d369ad46038f407b9.jpg.webp",
  "https://salt.tikicdn.com/cache/750x750/ts/product/d8/fc/e2/fa3325ea63c42a3622fb84b15e80e003.jpg.webp",
  "https://salt.tikicdn.com/cache/750x750/ts/product/12/21/2b/001ef2560168451646ea962347dd72ce.jpg.webp",
];

function ImageShow() {
  const [image, setImage] = useState(imageData[0]);
  return (
    <div className={cx("wrapper")}>
      <img className={cx("main-img")} alt="product image" src={image} />
      <ul className={cx("img-list")}>
        {imageData.map((image) => (
          <li key={image} onClick={() => setImage(image)}>
            <img className={cx("other-img")} alt="product image" src={image} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImageShow;
