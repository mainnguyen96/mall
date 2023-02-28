import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import { getData } from "~/firebaseServices/firebaseServices";
import styles from "./FooterSection.module.css";

const cx = classNames.bind(styles);

function FooterSection({ label }) {
  const [footerData, setFooterData] = useState();
  useEffect(() => {
    getData("footer/footerData", "type", label).then((data) => {
      setFooterData(Object.values(data));
    });
  }, []);
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("header")}>{label}</h3>
      {footerData && (
        <ul className={cx("list")}>
          {footerData.map((item) => {
            if (item.label) {
              return (
                <li key={item.id} className={cx("item")}>
                  {item.label}
                </li>
              );
            } else if (item.icon) {
              return (
                <li key={item.id} className={cx("icon")}>
                  <img src={item.icon} className={cx("icon-img")} alt="icon" />
                </li>
              );
            }
          })}
        </ul>
      )}
    </div>
  );
}

export default FooterSection;
