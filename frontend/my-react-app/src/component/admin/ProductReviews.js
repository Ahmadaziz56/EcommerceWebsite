import React, { Fragment, useEffect, useState } from "react"
import { DataGrid } from "@material-ui/data-grid"
import { deleteReviews, clearErrors,getAllReviews } from "../../actions/productActions"
import { Button } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import MetaData from "../layout/MetaData"
import { useAlert } from "react-alert"
import DeleteIcon from "@material-ui/icons/Delete"
import Star from "@material-ui/icons/Star"
import Slider from "./Slider"
import { DELETE_REVIEW_RESET, PRODUCT_DELETE_RESET } from "../../constants/productConstant"
const ProductReviews = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { error:deleteError, isDeleted } = useSelector((state) => state.review)
    const { error,reviews,loading} = useSelector((state) => state.productReviews)
    const [productId,setProductId]=useState("")
   
    const columns = [
        {
            field: "id",
            headerName: "REVIEW ID",
            minWidth: 200,
            flex: 0.5
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 0.6
        },
        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 1
        },
        {
            field: "rating",
            headerName: "Rating",
            minWidth: 180,
            type: "Number",
            flex: 0.4,
            cellClassName: (params) => {

                return params.getValue(params.id, "rating") >= 3
                    ? "greenColor" : "redColor"

            },
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 270,
            type: "Number",
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {

                return (
                    <Fragment>
                        <Button onClick={()=>deleteReviewHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                )
            }
        },
    ]
    const deleteReviewHandler=(reviewID)=>{
        dispatch(deleteReviews(reviewID,productId))
    }

    const rows = []
    reviews &&
        reviews.forEach((item) => {
            rows.push({
                id: item._id,
                rating: item.rating,
                comment: item.comment,
                name: item.name,
            })
        });
        
        
    useEffect(() => {
        if(productId.length===24){
            dispatch(getAllReviews(productId))
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success("review deleted successfully")
            dispatch({type:DELETE_REVIEW_RESET})
        }
        
    }, [dispatch, alert, error,isDeleted,deleteError,productId])
    const productReviewsSubmitHandler=(e)=>{
        e.preventDefault()
        dispatch(getAllReviews(productId))
    }
    console.log(productId)
    return <Fragment>
        <MetaData title={`ALL REVIEWS -- Admin`} />
        <div className="dashboard">
            <Slider />
            <div className="productReviewsContainer" >
            <form
                        className="productReviewsForm"
                        encType="multipart/form-data"
                        onSubmit={productReviewsSubmitHandler}
                    >
                        <h1 className="productReviewsFormHeading">ALL REVIEWS </h1>

                        <div>
                            <Star />
                            <input
                                type="text"
                                placeholder="PRODUCT ID"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>
                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false || productId === "" ? true : false}
                        >
                            Find
                        </Button>
                    </form>
                    {reviews &&reviews.length>0?<DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="productListTable"
                    autoHeight
                />:<h1 className="productReviewsFormHeading">
                    No Reviews Found
                </h1>
                }
                

            </div>
        </div>
    </Fragment>
}
export default ProductReviews