import { Formik, Form, Field } from "formik";
import Tippy from "@tippyjs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import CartProduct from "../CartProduct";
import styles from "./CartInfo.module.css";
import { useEffect, useState } from "react";
import { getData } from "~/firebaseServices";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/authSlice";
import { timeCompare } from "~/ultil";

const cx = classNames.bind(styles);

function CartInfo({ setPurchaseProducts }) {
  const [products, setProducts] = useState();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const auth = useSelector(selectAuth);
  useEffect(() => {
    getData("carts/" + auth.userId).then((data) => {
      setProducts(Object.entries(data));
    });
  }, [auth.userId]);
  const totalProducts = products?.length;
  const totalProductsId = products?.map(([productId]) => productId);
  
  return (
    <div className={cx("wrapper")}>
      <Formik
        initialValues={{}}
        enableReinitialize={true}
        onSubmit={(values) => {
          setSelectedProducts(values.checked);
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
                  onChange={(event) => {
                    if (event.target.checked) {
                      formik.setFieldValue("checked", [
                        ...totalProductsId,
                        "all",
                      ]);
                    } else {
                      formik.setFieldValue("checked", []);
                    }
                  }}
                />
                All ({totalProducts} products)
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
            {products
              ?.sort((a, b) => timeCompare(a[1].time, b[1].time))
              .map(([productId, productInfo], index) => (
                <CartProduct
                  setPurchaseProducts={setPurchaseProducts}
                  count={productInfo.count}
                  key={index}
                  productId={productId}
                  id="checked"
                  name="checked"
                  value={productId}
                  selected={selectedProducts.includes(`${productId}`)}
                />
              ))}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CartInfo;
