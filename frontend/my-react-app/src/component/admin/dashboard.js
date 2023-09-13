import React, { useEffect } from "react";
import Slider from "./Slider.js";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Line, Doughnut } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../actions/productActions"
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers} from "../../actions/userAction"
Chart.register(CategoryScale);

const DashBoard = () => {
    const dispatch = useDispatch()
    const { users} = useSelector((state) => state.allUsers)
    
    const { products } = useSelector((state) => state.products)
    const { orders } = useSelector((state) => state.allOrders)
    let outOfStock = 0
    products
        && products.forEach((item) => {
            if (item.Stock === 0) {
                outOfStock += 1
                console.log(outOfStock)
            }
        })
        useEffect(() => {
            dispatch(getAdminProducts())
            dispatch(getAllOrders())
            dispatch(getAllUsers())
        }, [dispatch])
    let totalAmount=0
    orders &&orders.forEach((order)=>{
        totalAmount+=order.totalPrice
    })
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                borderColor: "rgb(197, 72, 49)",
                borderWidth: 1,
                data: [0, totalAmount],
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                labels: ['Initial Amount', 'Amount Earned'],
            },
        },
    };
    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products.length - outOfStock]
            }
        ]
    }
    return (
        <div className="dashboard">
            <Slider />
            <div className="dashboardContainer">
                <Typography component="h1">DashBoard</Typography>
                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> ${totalAmount}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>
                <div className="lineChart">
                    <Line data={lineState} options={options} />
                </div>
                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
