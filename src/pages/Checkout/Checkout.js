import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import { updatePurchaseData } from "~/firebaseServices";
import {
  fetchAuth,
  selectAuth,
  selectUserLocation,
} from "~/features/authSlice";
import {
  fetchShippingMethods,
  fetchShippingPrice,
  selectCurrentShippingMethod,
  selectCurrentShippingPrice,
  selectShippingMethods,
  setCurrentShippingMethod,
} from "~/features/shippingSlice";
import { convertCurrency } from "~/ultil";
import { routes } from "~/config/routes";
import logo from "~/assets/images/logo.png";
import Location from "~/components/Location";
import Promotion from "~/components/Promotion";
import Bill from "~/components/Cart/Bill";
import CheckoutProduct from "./CheckoutProduct";
import Modal from "~/components/Modal";
import Delivery from "~/components/Delivery";
import styles from "./Checkout.module.css";

const cx = classNames.bind(styles);

function Checkout() {
  const [products, setProducts] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const shippingMethods = useSelector(selectShippingMethods);
  const currentShippingMethod = useSelector(selectCurrentShippingMethod);
  const currentShippingPrice = useSelector(selectCurrentShippingPrice);
  const auth = useSelector(selectAuth);
  const currentUserLocation = useSelector(selectUserLocation);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAuth());
    if (!auth.auth) {
      navigate(routes.home);
    }
  }, [navigate, auth.auth, dispatch]);

  useEffect(() => {
    dispatch(fetchShippingMethods());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchShippingPrice({
        userId: auth.userId,
        userLocationId: currentUserLocation?.id,
      })
    );
  }, [dispatch, auth.userId, currentUserLocation, currentShippingMethod]);

  useEffect(() => {
    setProducts(location.state.purchaseProducts);
    setTotalPrice(location.state.totalPrice);
  }, [location]);

  const handlePurchaseClick = () => {
    const data = {};
    data.products = {};
    data.total = +totalPrice + +currentShippingPrice;
    data.time = new Date();
    data.location = currentUserLocation.id;
    data.shippingMethod = currentShippingMethod.id;
    products.map(([id, count]) => {
      data.products[id] = count;
    });
    const purchaseId = nanoid();
    updatePurchaseData(auth.currentUser.uid, purchaseId, data);
  };

  return (
    <div className={cx("wrapper")}>
      {showDeliveryForm && (
        <div className={cx("delivery-form")}>
          <Modal />
          <div className={cx("form")}>
            <Delivery onClose={() => setShowDeliveryForm(false)} />
          </div>
        </div>
      )}
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
            {currentShippingMethod && (
              <Formik
                initialValues={{ shippingMethod: currentShippingMethod?.id }}
                onSubmit={(values) => {
                  const id = values.shippingMethod;
                  const [label] = shippingMethods.filter(
                    (method) => method.id == id
                  );
                  dispatch(
                    setCurrentShippingMethod({ id: id, label: label.label })
                  );
                }}
              >
                {(formik) => (
                  <Form onChangeCapture={() => formik.handleSubmit()}>
                    <ul className={cx("delivery-list")}>
                      {shippingMethods.map((method, index) => (
                        <li key={method.id} className={cx("delivery-item")}>
                          <label>
                            <Field
                              name={"shippingMethod"}
                              id={"shippingMethod"}
                              type="radio"
                              className={cx("delivery-radio")}
                              value={method.id}
                            />
                            {method.label}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </Form>
                )}
              </Formik>
            )}
            <div className={cx("package")}>
              <p className={cx("delivery-info")}>
                <FontAwesomeIcon
                  className={cx("package-icon")}
                  icon={faTruck}
                />
                Package: Delivered on Thursday, February 23
              </p>
              <div className={cx("delivery-method")}>
                <p className={cx("delivery-name")}>
                  {currentShippingMethod?.label}
                </p>
                <p className={cx("delivery-price")}>
                  {convertCurrency(currentShippingPrice)}
                </p>
              </div>
              {products?.map(([productId, count], index) => (
                <CheckoutProduct
                  count={count}
                  key={index}
                  productId={productId}
                />
              ))}
            </div>
          </div>
          <div className={cx("method")}></div>
        </div>
        <div className={cx("billing")}>
          <Location onChangeClick={() => setShowDeliveryForm(true)} />
          <Promotion />
          <Bill
            totalPrice={totalPrice}
            onBuyClick={handlePurchaseClick}
            shippingPrice={currentShippingPrice}
          />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
