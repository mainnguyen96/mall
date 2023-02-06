import classNames from "classnames/bind";
import LoginForm from "~/components/LoginForm";
import Login from "~/components/LoginForm/Login/Login";
import Password from "~/components/LoginForm/Password";
import Verify from "~/components/LoginForm/Verify";
import ProductDesc from "~/components/ProductDesc";
import ProductDetail from "~/components/ProductDetail";
import ProductInfo from "~/components/ProductInfo";
import ProductSimilar from "~/components/ProductSimilar";
import TemplePage from "../TemplePage";

function Product() {
    return ( 
        <TemplePage showSidebar={false}>
            <ProductInfo/>
            <ProductSimilar/>
            <ProductDetail/>
            <ProductDesc/>
            {/* <LoginForm form={<Verify/>}/> */}
        </TemplePage>
     );
}

export default Product; 