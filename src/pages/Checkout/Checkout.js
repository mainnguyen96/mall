import classNames from "classnames/bind";
import logo from "~/assets/images/logo.png";

import styles from "./Checkout.module.css";
import Location from "~/components/Location";
import Promotion from "~/components/Promotion";
import Bill from "~/components/Cart/Bill";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
const deliveryMethod = ["Giao hang nhanh", "Giao hang tiet kiem"];

function Checkout() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header-background")}>
        <div className={cx("header")}>
          <img className={cx("logo")} src={logo} alt="logo" />
          <h1 className={cx("label")}>Payment</h1>
        </div>
      </div>
      <div className={cx("content")}>
        <div className={cx("info")}>
          <div className={cx("delivery")}>
            <h2 className={cx("delivery-label")}>Choose a delivery method</h2>
            <Formik>
              {(formik) => (
                <Form>
                  <ul className={cx("delivery-list")}>
                    {deliveryMethod.map((method, index) => (
                      <li key={index} className={cx("delivery-item")}>
                        <label>
                          <Field
                            type="radio"
                            className={cx("delivery-radio")}
                          />
                          {method}
                        </label>
                      </li>
                    ))}
                  </ul>
                </Form>
              )}
            </Formik>
            <div className={cx("package")}>
              <p className={cx("delivery-info")}>
                <FontAwesomeIcon
                  className={cx("package-icon")}
                  icon={faTruck}
                />
                Package: Delivered on Thursday, February 23
              </p>
              <div className={cx("delivery-method")}>
                <p className={cx("delivery-name")}>Giao hang tiet kiem</p>
                <p className={cx("delivery-price")}>12000</p>
              </div>
              <div className={cx("product")}>
                <img
                  className={cx("product-image")}
                  src="https://salt.tikicdn.com/cache/96x96/ts/product/0f/08/21/8995e74fd95c47c4ab9ef244a5559176.png.webp"
                  alt="product"
                />
                <div className={cx("product-info")}>
                  <label className={cx("product-name")}>
                    Apple iPhone 14 Pro 128GB Black
                  </label>
                  <br />
                  <span className={cx("product-quantity")}>Count: 1</span>
                  <span className={cx("product-price")}>25990000</span>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("method")}></div>
        </div>
        <div className={cx("billing")}>
          <Location />
          <Promotion />
          <Bill />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
