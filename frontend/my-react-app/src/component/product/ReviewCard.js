import React from "react"
import RatingStar from "react-rating-stars-component";
import profile from "../images/Profile.png"
const ReviewCard=({review})=>{
    const options = {
        edit: false,
        color: "#dcdbf5",
        activeColor: "tomato",
        value: review.rating,
        isHalf: true,
        size: window.innerWidth < 600 ? 16 : 20,
      };
    return (
        <div className="reviewCard">
            <img src={profile} alt="User"/>
            <p>{review.name}</p>
            <RatingStar {...options} />
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    )
}
export default ReviewCard