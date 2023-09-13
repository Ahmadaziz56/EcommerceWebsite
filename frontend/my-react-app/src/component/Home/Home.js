import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import Product from "./ProductCard.js";
import MetaData from "../layout/MetaData.js";
import { clearErrors, getProduct } from "../../actions/productActions.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/loader.js";
import { useAlert } from "react-alert";


const Home = () => {
  const alert=useAlert()
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(state => state.products);

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }
    dispatch(getProduct());
  }, [dispatch,error,alert]);

  const handleScroll = () => {
    const productsElement = document.getElementById("FeaturedProducts");
    if (productsElement) {
      productsElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {loading ? (
        <Loader/>
      ) : (
        <>
          <MetaData title="ECOMMERCE" />
          <section className="section1">
            <div className="HeroSections">
              <h5>Welcome to Ecommerce</h5>
              <h1>FIND AMAZING PRODUCTS BELOW</h1>
              <button className="fa-bounce" onClick={handleScroll}>
                Scroll <CgMouse />
              </button>
            </div>
          </section>
          <section className="section2">
            <h5>Featured Products</h5>
            <div className="FeaturedProducts" id="FeaturedProducts">
              {products &&
                products.map(product => (
                  <Product key={product.id} product={product} />
                ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
