import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import { getAuth, onAuthStateChanged } from "~/firebaseServices";
import TemplePage from "../TemplePage";
import Bill from "~/components/Cart/Bill";
import Location from "~/components/Location";
import Promotion from "~/components/Promotion";
import { routes } from "~/config/routes";
import CartInfo from "~/components/Cart/CartInfo";
import styles from "./Cart.module.css";

const cx = classNames.bind(styles);

function Cart() {
  const [purchaseProducts, setPurchaseProducts] = useState({
    totalPrice: 0,
    products: {},
  });
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate(routes.home);
      }
    });
  }, [navigate]);
  const handleBuy = () => {
    console.log("purchase:", purchaseProducts);
    const purchase = Object.entries(purchaseProducts.products).filter(
      ([id, count]) => count > 0
    );
    const totalPrice = purchaseProducts.totalPrice;
    navigate(routes.checkout, {
      state: { totalPrice, purchaseProducts: purchase },
    });
  };
  return (
    <TemplePage showSidebar={false}>
      <div className={cx("wrapper")}>
        <h2 className={cx("header")}>Products Cart</h2>
        <div className={cx("content")}>
          <div className={cx("info")}>
            <CartInfo setPurchaseProducts={setPurchaseProducts} />
          </div>
          <div className={cx("billing")}>
            <Location />
            <Promotion />
            <Bill
              onBuyClick={handleBuy}
              totalPrice={purchaseProducts.totalPrice}
            />
          </div>
        </div>
      </div>
    </TemplePage>
  );
}

export default Cart;
