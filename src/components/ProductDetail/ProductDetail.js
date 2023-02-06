import classNames from "classnames/bind";

import styles from "./ProductDetail.module.css";

const cx = classNames.bind(styles);

const detailData = {
  Trademark: "Apple",
  "Brand Origin": "America",
  "Rear camera": "Main 48 MP & Secondary 12 MP, 12 MP",
};

function ProductDetail() {
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("label")}>Details</h3>
      <table className={cx("table")}>
        <tbody className={cx("content")}>
          {Object.entries(detailData).map(([detail, info]) => (
            <tr className={cx("row")}>
              <td className={cx("detail")}>{detail}</td>
              <td className={cx("info")}>{info}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductDetail;
