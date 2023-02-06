import { useEffect, useState } from "react";
import { ref, onValue, query, orderByChild, equalTo } from "firebase/database";
import classNames from "classnames/bind";

import { firebaseDB } from "~/firebaseServices/firebaseServices";
import styles from "./FooterSection.module.css";

const cx = classNames.bind(styles);

function FooterSection({ label }) {
  const [footerData, setFooterData] = useState();
  useEffect(() => {
    const footerData = query(
      ref(firebaseDB, "footer/footerData"),
      orderByChild("type"),
      equalTo(label)
    );
    onValue(
      footerData,
      (snapshot) => {
        const data = snapshot.val();
        setFooterData(Object.values(data));
      },
      { onlyOnce: true }
    );
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
