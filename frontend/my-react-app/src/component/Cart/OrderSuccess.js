import react from "react"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import {Link} from "react-router-dom"
import { Typography } from "@material-ui/core"
const OrderSuccess=()=>{
    return (
       <div className="emptyCart">
        <CheckCircleIcon/>
        <Typography>Your Order has been placed successfully</Typography>
        <Link to="/orders">View Orders</Link>
       </div>
    )
}
export default OrderSuccess