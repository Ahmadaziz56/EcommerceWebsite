import react, { Fragment, useEffect } from "react"
import { DataGrid } from "@material-ui/data-grid"
import { clearErrors, myOrders } from "../../actions/orderAction"
import Loader from "../layout/loader/loader"
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData"
import { Typography } from "@material-ui/core/"
import { Link } from "react-router-dom"
import LaunchIcon from "@material-ui/icons/Launch"
import { useDispatch, useSelector } from "react-redux"
const MyOrders = () => {
    const dispatch = useDispatch()
    const alert = useAlert
    const { loading, error, orders } = useSelector((state => state.myOrders))
    const { user } = useSelector((state => state.user))
    if (orders && orders.length > 0) {
        console.log(orders[0]._id);
    } else {
        console.log("No orders found.");
    }
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ?
                    "greenColor":"redColor"
            }
        },
        {
            field: "itemQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150, flex: 0.3
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270, flex: 0.5
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "number",
            minWidth: 150, flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon /></Link>
                )
            }
        },
    ]
    const rows = []
    orders &&
        orders.forEach((item, index) => {
            rows.push({
                itemQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            })
        })
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(myOrders())
    }, [dispatch, alert, error])

    return <Fragment>

        <MetaData title={`${user.name} - Orders`} />
        {loading ? (<Loader />) : (
            <div className="myOrdersPage">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="myOrdersTable"
                    autoHeight
                />
                <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>

            </div>
        )}
    </Fragment>
}
export default MyOrders