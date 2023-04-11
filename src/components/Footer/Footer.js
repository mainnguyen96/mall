import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";

import {
  fetchFooterTypes,
  selectFooterStatus,
  selectFooterTypes,
} from "~/features/footerSlice";
import FooterSection from "./FooterSection";
import styles from "./Footer.module.css";

const cx = classNames.bind(styles);

function Footer() {
  const footerTypes = useSelector(selectFooterTypes);
  const status = useSelector(selectFooterStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchFooterTypes());
    }
  }, [dispatch, status]);

  return (
    <div className={cx("wrapper")}>
      <section className={cx("section")}>
        {footerTypes &&
          footerTypes.map((type) => (
            <FooterSection key={type.type} label={type.type} />
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
