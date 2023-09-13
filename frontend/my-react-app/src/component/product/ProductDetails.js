import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productActions";
import { useParams,useNavigate } from 'react-router-dom';
import ReviewCard from "./ReviewCard.js"
import Loader from "../layout/loader/loader"
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction"
import { newReview } from "../../actions/productActions"
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from "@material-ui/core"
import { Rating } from "@material-ui/lab"
import { NEW_REVIEW_RESET } from "../../constants/productConstant";
const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate=useNavigate()
    const Alert = useAlert()
    const { products, loading, error } = useSelector(state => state.productDetails);
    const {isAuthenticated} = useSelector(state => state.user);
    const {success, error:reviewError } = useSelector(state => state.newReview);
    const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState("")
    const [comment, setComment] = useState("")
    const increaseQuntity = () => {
        if (products.Stock <= quantity)
            return
        const qty = quantity + 1
        setQuantity(qty)
    }
    console.log(products.Stock)
    const decreaseQuntity = () => {
        if (quantity > 1) {
            const qty = quantity - 1
            setQuantity(qty)
        }

    }
   

    const options = {
        value: products.ratings,
        readOnly:true,
        size:"large",
        precision:0.5, 
    };
    console.log(products.ratings)
    const submitREviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }
    let reviewText = "No reviews"; // Default text for no reviews
    if (products.numberofreviews === 1) {
        reviewText = "1 review";
    } else if (products.numberofreviews > 1) {
        reviewText = `${products.numberofreviews} reviews`;
    }
    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity))
        Alert.success("Item Added to Cart")
    }
    const submitReviewHandler = () => {
        if(!isAuthenticated){
            navigate("/login")
        }
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);
        dispatch(newReview(myForm))
        setOpen(false)
    } 
    useEffect(() => {
        if (error) {
            Alert.error(error)
            dispatch(clearErrors())
        }
        if (reviewError) {
            Alert.error(reviewError)
            dispatch(clearErrors())
        }
        if (success) {
            Alert.success("Review Submitted SuccessFully")
            dispatch({type:NEW_REVIEW_RESET})
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, Alert,reviewError,success]);

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={`${products.name} -- ECOMMERCE`} />
                    <div className="ProductDetails">
                        <div className="productDetailspage">
                            <Carousel>
                                {products.images &&
                                    products.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={i}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
                                {products.images &&
                                    products.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={i}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
                            </Carousel>
                        </div>
                        <div className="">
                            <div className="detailsBlock-1">
                                <h2>{products.name}</h2>
                                <p>{`Product: ${id}`}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options}></Rating>
                                <span className="detailsBlock-2-span">({reviewText})</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`$ ${products.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuntity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuntity}>+</button>
                                    </div>
                                    <button disabled={products.Stock > 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                                </div>
                                <p>
                                    <b className={products.stock < 1 ? "redColor" : "greenColor"}>
                                        {products.stock < 1 ? "Out of Stock" : "InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description :<p>{products.description}</p>
                            </div>
                            <button onClick={submitREviewToggle} className="submitReview">Submit Review</button>
                        </div>


                    </div>
                    <h2 className="reviewsHeading">Reviews</h2>
                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitREviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />
                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            >

                            </textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitREviewToggle} color="secondary">Cancel</Button>
                            <Button onClick={submitReviewHandler} color="primary">Submit</Button>
                        </DialogActions>

                    </Dialog>
                    {products.reviews && products.reviews[0] ? (
                        <div className="reviews">
                            {
                                products.reviews && products.reviews.map((review) => <ReviewCard review={review} />)
                            }
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProductDetails;
