import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, clearErrors } from "../../actions/productActions";
import Loader from "../layout/loader/loader";
import ProductCard from "../Home/ProductCard.js";
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination"
import { useState } from "react";
import {useAlert} from "react-alert"
import Slider from "@material-ui/core/Slider"
import Typography from "@material-ui/core/Typography"
import MetaData from "../layout/MetaData.js";
const categories=[
    "Coat",
    "Footwear",
    "person"
]
const Products = () => {
    const { keyword } = useParams();
    const dispatch = useDispatch();
    const alert=useAlert()
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 25000])
    const [category, setCategory] = useState("")
    const { products,
        loading, error,
        productcount,
         resultperpage,
        
    } = useSelector(state => state.products);
    const [ratings,setRatings]=useState(0)

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword, currentPage, price,category,ratings));
    }, [dispatch, keyword, currentPage, price,category,ratings,alert,error]);
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }

    let productNotFound = "Products";

    if (!loading && products && products.length === 0) {
        productNotFound = "Product Not Found";
    }


    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title="PRODUCTS -- ECOMMERCE"/>
                    <h2 className="productsHeading">{productNotFound}</h2>
                    <div className="FeaturedProducts">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        }
                    </div>
                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={25000}
                        />
                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((category)=>(
                                <li
                                className="category-link"
                                key={category}
                                onClick={()=>setCategory(category)}
                                
                                >
                                    {category}

                                </li>
                            ))}
                            
                        </ul>
                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider 
                            value={ratings}
                            onChange={(e,newRating)=>{
                                setRatings(newRating)
                            }}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={5}/>
                        </fieldset>
                    </div>
                    <div className="paginationBox">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultperpage}
                            totalItemsCount={productcount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                        />
                    </div>
                </Fragment>
            }
        </Fragment>
    );

};

export default Products;
