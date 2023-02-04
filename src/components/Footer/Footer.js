import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { ref, onValue, query } from "firebase/database";

import { firebaseDB } from "~/firebaseServices/firebaseServices";
import FooterSection from "../FooterSection";
import styles from "./Footer.module.css";

const cx = classNames.bind(styles);

function Footer() {
  const [footerType, setFooterType] = useState();
  useEffect(() => {
    const footerType = query(ref(firebaseDB, "footer/footerType"));

    onValue(footerType, (snapshot) => {
      const data = snapshot.val();
      setFooterType(Object.values(data));
    });
  }, []);
  return (
    <div className={cx("wrapper")}>
      <section className={cx("section")}>
        {footerType &&
          footerType.map((label) => (
            <FooterSection key={label} label={label} />
          ))}
      </section>

      <div className={cx("footer")}>
        <p>
          Trụ sở chính: Tòa nhà X, Số 69, đường Cách Mạng Tháng 8, phường 12,
          quận 10, Thành phố Đà Nẵng
        </p>
        <p>
          Mall nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ trợ mua và
          nhận hàng trực tiếp tại văn phòng hoặc trung tâm xử lý đơn hàng
        </p>
        <p>
          Giấy chứng nhận Đăng ký Kinh doanh số 69696969 do Sở Kế hoạch và Đầu
          tư Thành phố X cấp lần đầu ngày 31/02/2069
        </p>
        <p>© 2023 - Bản quyền của Công ty TNHH Mall</p>
      </div>
    </div>
  );
}

export default Footer;
