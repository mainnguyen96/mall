import { Formik, Form, Field } from "formik";
import Tippy from "@tippyjs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import CartProduct from "../CartProduct";
import styles from "./CartInfo.module.css";

const cx = classNames.bind(styles);

function CartInfo() {
  return (
    <div className={cx("wrapper")}>
      <Formik
        initialValues={{}}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <Form onChangeCapture={() => formik.handleSubmit()}>
            <div className={cx("header")}>
              <label className={cx("header-label")}>
                <Field
                  id="all"
                  name="checked"
                  value="all"
                  type="checkbox"
                  className={cx("checkbox")}
                />
                All (4 products)
              </label>
              <label className={cx("label")}>Unit price</label>
              <label className={cx("label")}>Quantity</label>
              <label className={cx("label")}>Money</label>
              <Tippy
                content={
                  <p className={cx("icon-label")}>Delete selected items</p>
                }
                placement="bottom"
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className={cx("header-icon")}
                />
              </Tippy>
            </div>
            <CartProduct id="checked" name="checked" value="product1" />
            <CartProduct />
            <CartProduct />
            <CartProduct />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CartInfo;
