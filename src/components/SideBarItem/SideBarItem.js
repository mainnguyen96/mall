import classNames from "classnames/bind";

import itemIcon from "~/assets/images/itemIcon.png";
import Button from "../Button";
import styles from "./SideBarItem.module.css";

const cx = classNames.bind(styles);

function SideBarItem({ label }) {
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("header")}>{label}</h3>
      <ul className={cx("list")}>
        <li className={cx("item")}>
          <Button type={"item"} label={"Discount code"} icon={itemIcon} />
        </li>
        <li className={cx("item")}>
          <Button type={"item"} label={"Discount code"} icon={itemIcon} />
        </li>
        <li className={cx("item")}>
          <Button type={"item"} label={"Discount code"} icon={itemIcon} />
        </li>
        <li className={cx("item")}>
          <Button type={"item"} label={"Discount code"} icon={itemIcon} />
        </li>
        <li className={cx("item")}>
          <Button type={"item"} label={"Discount code"} icon={itemIcon} />
        </li>
        <li className={cx("item")}>
          <Button type={"item"} label={"Discount code"} icon={itemIcon} />
        </li>
      </ul>
    </div>
  );
}

export default SideBarItem;
