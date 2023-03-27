import { Formik, Form, Field } from "formik";
import Tippy from "@tippyjs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import CartProduct from "../CartProduct";
import styles from "./CartInfo.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "~/features/authSlice";
import { fetchCart, selectCartProducts } from "~/features/cartSlice";

const cx = classNames.bind(styles);

function CartInfo({ setPurchaseProducts }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isReload, SetIsReload] = useState();
  const auth = useSelector(selectAuth);
  const products = useSelector(selectCartProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart(auth.userId));
    SetIsReload(true);
  }, [auth.userId, isReload, dispatch]);
  const totalProducts = products?.length;
  const totalProductsId = products?.map((product) => product.id);

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
            <table className={cx("cart-table")}>
              <thead>
                <tr>
                  <th className={cx("left")}>
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
                  </th>
                  <th className={cx("right")}>Unit price</th>
                  <th>Quantity</th>
                  <th className={cx("right")}>Money</th>
                  <th>
                    <Tippy
                      content={
                        <p className={cx("icon-label")}>
                          Delete selected items
                        </p>
                      }
                      placement="bottom"
                    >
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className={cx("header-icon")}
                      />
                    </Tippy>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <CartProduct
                    setReload={SetIsReload}
                    setPurchaseProducts={setPurchaseProducts}
                    count={product.data.count}
                    key={index}
                    productId={product.id}
                    id="checked"
                    name="checked"
                    value={product.id}
                    selected={selectedProducts.includes(`${product.id}`)}
                  />
                ))}
              </tbody>
            </table>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CartInfo;
