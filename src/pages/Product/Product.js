import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getData } from "~/firebaseServices/firebaseServices";
import LoginForm from "~/components/LoginForm";
import Login from "~/components/LoginForm/Login/Login";
import Password from "~/components/LoginForm/Password";
import Verify from "~/components/LoginForm/Verify";
import ProductDesc from "~/components/Product/ProductDesc";
import ProductDetail from "~/components/Product/ProductDetail";
import ProductInfo from "~/components/Product/ProductInfo";
import ProductReviewList from "~/components/Product/ProductReviewList";
import ProductSimilar from "~/components/Product/ProductSimilar";
import TemplePage from "../TemplePage";

function Product() {
  const [productData, setProductData] = useState(null);
  const params = useParams();
  useEffect(() => {
    getData(`products/${params.productId}`).then((data) => {
      console.log(data);
      setProductData(data);
    });
  }, []);
  return (
    <TemplePage showSidebar={false}>
      {productData && (
        <>
          <ProductInfo
            name={productData.name}
            brand={productData.detail.Trademark}
            review={productData.review}
            sold={productData.sold}
            price={productData.price}
            imgs={productData.img}
          />
          <ProductSimilar />
          <ProductDetail details={productData.detail} />
          <ProductDesc desc={productData.description} />
          <ProductReviewList />
        </>
      )}
    </TemplePage>
  );
}

export default Product;
