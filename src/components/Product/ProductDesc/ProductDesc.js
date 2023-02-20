import classNames from "classnames/bind";

import styles from "./ProductDesc.module.css";

const cx = classNames.bind(styles);

function ProductDesc({ desc }) {
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("label")}>Product Description</h3>
      {typeof desc === "object" ? (
        <ul className={cx("main-list")}>
          {Object.entries(desc).map(([desc, content]) => (
            <li key={desc} className={cx("desc")}>
              <h4 className={cx("desc-label")}>{desc}</h4>
              {typeof content !== "object" ? (
                <p className={cx("content")}>{content}</p>
              ) : (
                <ul className={cx("content-list")}>
                  {Object.values(content).map((data) => (
                    <li key={data} className={cx("content")}>
                      {/^https:/.test(data) ? (
                        <img
                          src={data}
                          alt="descriptions item"
                          className={cx("desc-image")}
                        />
                      ) : (
                        data
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <img src={desc} alt="descriptions" className={cx("desc-image")} />
      )}
    </div>
  );
}

export default ProductDesc;
