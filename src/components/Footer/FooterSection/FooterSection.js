import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import { selectFooterDataByType } from "~/features/footerSlice";
import styles from "./FooterSection.module.css";

const cx = classNames.bind(styles);

function FooterSection({ label }) {
  const footerData = useSelector(selectFooterDataByType(label));

  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("header")}>{label}</h3>
      {
        <ul className={cx("list")}>
          {footerData.map((item) => {
            if (item.data.label) {
              return (
                <li key={item.id} className={cx("item")}>
                  {item.data.label}
                </li>
              );
            } else if (item.data.icon) {
              return (
                <li key={item.id} className={cx("icon")}>
                  <img
                    src={item.data.icon}
                    className={cx("icon-img")}
                    alt="icon"
                  />
                </li>
              );
            }
          })}
        </ul>
      }
    </div>
  );
}

export default FooterSection;
