import classNames from "classnames/bind";

import styles from "./ProductDesc.module.css";

const cx = classNames.bind(styles);

const descData = {
  "Advertising content":
    "iPhone 14 Pro Max. Capture impressive details with the 48MP Main Camera. Experience iPhone in a whole new way with Dynamic Island and the Always On display. Critical safety technology – Collision Detection 1 calls for help when you need it",
  "Salient features": {
    0: "6.7-inch Super Retina XDR Display 2 with Always On and ProMotion",
    1: "Dynamic Island, a wonderful new way to interact with iPhone",
  },
  Juridical: {
    0: "Emergency SOS using a cellular network connection or Wi-Fi Call.",
    1: "The screen has rounded corners. When measured in rectangles, the screen size diagonally is 6.69 inches. Actual display area is smaller.",
  },
};

function ProductDesc() {
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("label")}>Product Description</h3>
      <ul className={cx("main-list")}>
        {Object.entries(descData).map(([desc, content]) => (
          <li key={desc} className={cx("desc")}>
            <h4 className={cx("desc-label")}>{desc}</h4>
            {typeof content !== "object" ? (
              <p className={cx("content")}>{content}</p>
            ) : (
              <ul className={cx("content-list")}>
                {Object.values(content).map((data) => (
                  <li key={data} className={cx("content")}>
                    {data}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductDesc;
