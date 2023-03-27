import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchPurchaseDetail,
  selectPurchaseDetail,
} from "~/features/purchasesSlice";
import {
  convertCurrency,
} from "~/ultil";
import AccountPage from "../../AccountPage";
import DetailProductItem from "./DetailProductItem";

import styles from "./OrderDetail.module.css";

const cx = classNames.bind(styles);

function OrderDetail() {
  const purchaseData = useSelector(selectPurchaseDetail);
  const location = useLocation();
  const dispatch = useDispatch();
  const purchaseId = location.state.purchaseId;
  useEffect(() => {
    dispatch(fetchPurchaseDetail(purchaseId));
  }, [dispatch, purchaseId]);
  const DetailItem = ({ header, children }) => {
    return (
      <div className={cx("detail-item")}>
        <header className={cx("item-header")}>{header.toUpperCase()}</header>
        {children}
      </div>
    );
  };

  return (
    <AccountPage header={"Order Detail"}>
      <div className={cx("wrapper")}>
        <header className={cx("state")}>
          Order Id: #{purchaseId} - <span>Delivery successful</span>
        </header>
        <div className={cx("date")}>Order date: {purchaseData?.time}</div>
        <DetailItem header={"notification"}></DetailItem>
        <div className={cx("details")}>
          <DetailItem header={"receiver's address"}>
            <h3 className={cx("name")}>NGUYEN DUC CHINH</h3>
            <p className={cx("address", "info")}>
              Address: {purchaseData?.location}
            </p>
            <p className={cx("phone", "info")}>Phone: 0398289941</p>
          </DetailItem>
          <DetailItem header={"delivery method"}>
            <p className={cx("method", "info")}>
              {purchaseData?.shippingMethod}
            </p>
            <p className={cx("delivery-date", "info")}>
              Delivery on Friday, 9/10
            </p>
            <p className={cx("shipping-fee", "info")}>
              Shipping fee: {convertCurrency(purchaseData?.shippingFee)}
            </p>
          </DetailItem>
          <DetailItem header={"payments"}>
            <p className={cx("payment-method", "info")}></p>
          </DetailItem>
        </div>
        <div className={cx("purchase")}>
          <table className={cx("product-table")}>
            <thead>
              <tr>
                <th>Product</th>
                <th className={cx("table-price")}>Price</th>
                <th>Quantity</th>
                <th>Discount</th>
                <th className={cx("table-price")}>Provisional</th>
              </tr>
            </thead>
            <tbody>
              {purchaseData?.products.map((product, index) => (
                <DetailProductItem key={index} product={product} />
              ))}
            </tbody>
          </table>
          <table className={cx("total-table")}>
            <tbody>
              <tr>
                <th>Provisional</th>
                <td>{convertCurrency(purchaseData?.provision)}</td>
              </tr>
              <tr>
                <th>Shipping fee</th>
                <td>{convertCurrency(purchaseData?.shippingFee)}</td>
              </tr>
              <tr>
                <th>Total</th>
                <td className={cx("total-data")}>
                  {convertCurrency(purchaseData?.total)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AccountPage>
  );
}

export default OrderDetail;
