import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";

import { getData } from "~/firebaseServices";
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
            star={productData.star}
            productId={productData.id}
          />
          <ProductSimilar />
          <ProductDetail details={productData.detail} />
          <ProductDesc desc={productData.description} />
          <div id="review-list">
            <ProductReviewList
              rate={productData.star}
              review={productData.review}
            />
          </div>
        </>
      )}
    </TemplePage>
  );
}

export default Product;
