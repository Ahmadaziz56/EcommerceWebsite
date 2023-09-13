import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "#dcdbf5",
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 16 : 20,
  };
  let reviewText = "No reviews"; // Default text for no reviews
  if (product.numberofreviews === 1) {
      reviewText = "1 review";
  } else if (product.numberofreviews > 1) {
      reviewText = `${product.numberofreviews} reviews`;
  }

  return (
    <Link className="productcard" to={`product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <RatingStars {...options} />
        <span className="reviews">({reviewText})</span>
      </div>
      <span className="price">{`$${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
