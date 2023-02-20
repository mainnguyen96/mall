import classNames from "classnames/bind";

import styles from "./ProductDetail.module.css";

const cx = classNames.bind(styles);

function ProductDetail({ details }) {
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("label")}>Details</h3>
      <table className={cx("table")}>
        <tbody className={cx("content")}>
          {Object.entries(details).map(([detail, info], index) => (
            <tr key={index} className={cx("row")}>
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
