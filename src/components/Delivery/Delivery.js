import { Formik, Form, Field } from "formik";
import classNames from "classnames/bind";

import Button from "../Button";
import SelectForm from "../Form/SelectForm";
import styles from "./Delivery.module.css";

const cx = classNames.bind(styles);

const deliveryData = ["Da Nang", "Quang Ngai", "Choose another delivery area"];
const anotherData = ["Province/City", "District", "Wards"];

function Delivery() {
  return (
    <div className={cx("wrapper")}>
      <header className={cx("header")}>Delivery address</header>
      <p className={cx("desc")}>
        Please select the delivery address to receive the most accurate forecast
        of delivery time and packaging and shipping fees.
      </p>
      <Formik>
        {(formik) => (
          <Form className={cx("form")}>
            <ul className={cx("list-item")}>
              {deliveryData.map((location, index) => (
                <li key={index} className={cx("radio")}>
                  <label className={cx("item")}>
                    <Field className={cx("radio-btn")} type="radio" />
                    {location}
                  </label>
                </li>
              ))}
              {true && (
                <div className={cx("another")}>
                  {anotherData.map((location, index) => (
                    <li key={index} className={cx("select")}>
                      <label className={cx("item")}>
                        <span className={cx("item-label")}>{location}</span>
                        <SelectForm size={"large"} />
                      </label>
                    </li>
                  ))}
                </div>
              )}
            </ul>
            <div className={cx("submit")}>
              <Button type={"submit"} label={"Ship to this address"}></Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Delivery;
