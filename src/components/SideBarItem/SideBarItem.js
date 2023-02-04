import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import itemIcon from "~/assets/images/itemIcon.png";
import Button from "../Button";
import styles from "./SideBarItem.module.css";

const cx = classNames.bind(styles);

function SideBarItem({ label, items }) {
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("header")}>{label}</h3>
      <ul className={cx("list")}>
        {Object.entries(items)
          .sort((a, b) => a[1].id - b[1].id)
          .map(([label, data], index) => (
            <li key={index} className={cx("item")}>
              <Link to={`/category/${data.path}`} className={cx("item-link")}>
                <Button
                  type={"item"}
                  label={label}
                  icon={data.icon}
                  onClick={() => console.log(data.path)}
                />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SideBarItem;
