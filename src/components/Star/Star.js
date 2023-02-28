import classNames from "classnames/bind";

import styles from "./Star.module.css";

const cx = classNames.bind(styles);

function Star({rate}) {
  const rateStyle = {}
  rateStyle['--rating'] = rate
  return <div className={cx("wrapper")} style={rateStyle}></div>;
}

export default Star;
