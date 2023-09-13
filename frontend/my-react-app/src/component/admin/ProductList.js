import React, { Fragment, useEffect } from "react"
import { DataGrid } from "@material-ui/data-grid"
import { getAdminProducts, clearErrors,deleteProductAction } from "../../actions/productActions"
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import MetaData from "../layout/MetaData"
import { useAlert } from "react-alert"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import Slider from "./Slider"
import { PRODUCT_DELETE_RESET } from "../../constants/productConstant"
const ProductList = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, products } = useSelector((state) => state.products)
    const { error:deleteError,isDeleted} = useSelector((state) => state.deleteProduct)
    const deleteProductHandler=(id)=>{
        dispatch(deleteProductAction(id))
    }
    const columns = [
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 200,
            flex: 0.5
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 250,
            flex: 1
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "Number",
            minWidth: 150,
            flex: 0.3
        },
        {
            field: "price",
            headerName: "Price",
            minWidth: 270,
            type: "Number",
            flex: 0.5
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
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={()=>deleteProductHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                )
            }
        },
    ]

    const rows = []
    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.Stock,
                price: item.price,
                name: item.name,
            })
        });
        
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success("Product deleted successfully")
            dispatch({type:PRODUCT_DELETE_RESET})
        }
        dispatch(getAdminProducts())
    }, [dispatch, alert, error,isDeleted,deleteError])
    return <Fragment>
        <MetaData title={`ALL PRODUCTS -- Admin`} />
        <div className="dashboard">
            <Slider />
            <div className="productListContainer" >

                <h1 id="productsListHeading">ALL PRODUCTS</h1>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="productListTable"
                    autoHeight
                />

            </div>
        </div>
    </Fragment>
}
export default ProductList