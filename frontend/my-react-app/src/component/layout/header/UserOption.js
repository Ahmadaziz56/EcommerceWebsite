import React, { Fragment, useState } from "react"
import { SpeedDial, SpeedDialAction } from "@material-ui/lab"
import DashboardIcon from "@material-ui/icons/Dashboard"
import PersonIcon from "@material-ui/icons/Person"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import ListAltIcon from "@material-ui/icons/ListAlt"
import { useNavigate } from "react-router-dom"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import BackDrop from "@material-ui/core/Backdrop"
import { useAlert } from "react-alert"
import { logout } from "../../../actions/userAction"
import { useDispatch, useSelector } from "react-redux"

const UserOption = ({ user }) => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const { cartItems } = useSelector((state) => state.cart)
    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ShoppingCartIcon style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} />, name: `cart (${cartItems.length})`, func: cart },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ]
    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard
        })

    }
    function orders() {
        navigate("/orders")
    }
    function dashboard() {
        navigate("/admin/dashboard")
    }
    function account() {
        navigate("/account")
    }
    function cart() {
        navigate("/cart")
    }
    function logoutUser() {
        dispatch(logout())
        alert.success("Logout SuccessFully")
    }
    const [open, setOpen] = useState(false)

    return <Fragment>
        <BackDrop open={open} style={{ zIndex: "1" }} />
        <SpeedDial

            ariaLabel="SppedDail tooltip example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            className="SpeedDial"
            direction="down"
            icon={<img
                src={user.avatar.url ? user.avatar.url : "./profile.png"}
                alt="Profile"
                className="speedDialIcon"
            />}
        >
            {options.map((item) => (
                <SpeedDialAction
                    key={item.name}
                    icon={item.icon}
                    tooltipTitle={item.name}
                    onClick={item.func}

                />
            ))}
        </SpeedDial>
    </Fragment>
}
export default UserOption