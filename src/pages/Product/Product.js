import { useParams } from "react-router-dom";
import classNames from "classnames/bind";

import ProductDesc from "~/components/Product/ProductDesc";
import ProductDetail from "~/components/Product/ProductDetail";
import ProductInfo from "~/components/Product/ProductInfo";
import ProductReviewList from "~/components/Product/ProductReviewList";
import ProductSimilar from "~/components/Product/ProductSimilar";
import TemplePage from "../TemplePage";
import { useSelector } from "react-redux";
import { selectProductsById } from "~/features/productsSlice";

function Product() {
  const params = useParams();
  const productData = useSelector(selectProductsById(params.productId));

  return (
    <TemplePage showSidebar={false}>
      {productData && (
        <>
          <ProductInfo
            name={productData.data.name}
            brand={productData.data.detail.Trademark}
            review={productData.data.review}
            sold={productData.data.sold}
            price={productData.data.price}
            imgs={productData.data.img}
            star={productData.data.star}
            productId={productData.id}
          />
          <ProductSimilar />
          <ProductDetail details={productData.data.detail} />
          <ProductDesc desc={productData.data.description} />
          <div id="review-list">
            <ProductReviewList
              rate={productData.data.star}
              review={productData.data.review}
            />
          </div>
        </>
      )}
    </TemplePage>
  );
}

export default Product;
