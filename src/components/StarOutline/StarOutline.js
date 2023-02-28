import classNames from "classnames/bind";

import styles from "./StarOutline.module.css";

const cx = classNames.bind(styles);

function StarOutline({ rate, size }) {
  const offset = (rate / 5) * 100;
  return (
    <div className={cx("wrapper", size)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <defs>
          <linearGradient id={`grad${rate}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "rgb(255, 213, 46)", stopOpacity: 1 }}
            />
            <stop
              offset={`${offset}%`}
              style={{ stopColor: "rgb(255, 213, 46)", stopOpacity: 1 }}
            />
            <stop
              offset={`${offset}%`}
              style={{ stopColor: "rgb(255,255,255)", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          d="M12 3L14.6198 8.81653L21 9.49342L16.239 13.7651L17.5623 20L12 16.8235L6.43769 20L7.761 13.7651L3 9.49342L9.38015 8.81653L12 3Z"
          fill={`url(#grad${rate})`}
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2L14.9109 8.50806L22 9.26543L16.71 14.045L18.1803 21.0211L12 17.467L5.81966 21.0211L7.29 14.045L2 9.26543L9.08906 8.50806L12 2ZM12 4.29426L9.72422 9.38228L4.18197 9.97439L8.31771 13.7111L7.16819 19.165L12 16.3864L16.8318 19.165L15.6823 13.7111L19.818 9.97439L14.2758 9.38228L12 4.29426Z"
          fill="#FFA142"
        ></path>
      </svg>
    </div>
  );
}

export default StarOutline;
