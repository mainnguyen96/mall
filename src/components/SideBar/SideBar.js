import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import classNames from "classnames/bind";

import { firebaseDB } from "~/firebaseServices/firebaseServices";
import SideBarItem from "../SideBarItem";
import styles from "./SideBar.module.css";

const cx = classNames.bind(styles);

function SideBar({ isShow }) {
  const [outstanding, setOutstanding] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const category = ref(firebaseDB, "category");
    const outstanding = ref(firebaseDB, "outstanding");

    onValue(
      category,
      (snapshot) => {
        const data = snapshot.val();
        setCategory(data);
      },
      { onlyOnce: true }
    );

    onValue(
      outstanding,
      (snapshot) => {
        const data = snapshot.val();
        setOutstanding(data);
      },
      { onlyOnce: true }
    );
  }, []);
  return (
    <div className={cx("wrapper", isShow && "show")}>
      {outstanding && <SideBarItem label={"Outstanding"} items={outstanding} />}
      {category && <SideBarItem label={"Category"} items={category} />}
    </div>
  );
}

export default SideBar;
