import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import SideBarItem from "../SideBarItem";
import styles from "./SideBar.module.css";
import { axiosInstance, getService } from "~/services/axiosInstance";

const cx = classNames.bind(styles);

function SideBar({isShow}) {

  const [outstanding, setOutstanding] = useState(null)
  const [category, setCategory] = useState(null)

  useEffect(() => {
    getService('outstanding')
    .then(data => {
      setOutstanding(data)
    })
    getService('category')
    .then(data => {
      setCategory(data)
    })
  },[])
  return (
    <div className={cx("wrapper", isShow && 'show')}>
     {outstanding && <SideBarItem label={"Outstanding"} items={outstanding}/>}
     {category && <SideBarItem label={"Category"} items={category}/>}
    </div>
  );
}

export default SideBar;
