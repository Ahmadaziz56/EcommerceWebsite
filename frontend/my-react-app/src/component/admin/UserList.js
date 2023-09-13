import React, { Fragment, useEffect } from "react"
import { DataGrid } from "@material-ui/data-grid"
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import MetaData from "../layout/MetaData"
import { useAlert } from "react-alert"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import Loader from "../layout/loader/loader"
import Slider from "./Slider"
import { DELETE_USER_RESET } from "../../constants/userConstant"
import { getAllUsers, deleteUser, clearErrors } from "../../actions/userAction"
const UserList = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, users, loading } = useSelector((state) => state.allUsers)
    const { error: deleteError, message, isDeleted } = useSelector((state) => state.profile)
    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }
    const columns = [
        {
            field: "id",
            headerName: "USER ID",
            minWidth: 180,
            flex: 0.8
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5
        },
        {
            field: "role",
            headerName: "Role",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {

                return params.getValue(params.id, "role") === "admin"
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
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => deleteUserHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                )
            }
        },
    ]

    const rows = []
    users &&
        users.forEach((item) => {
            rows.push({
                id: item._id,
                role: item.role,
                email: item.email,
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
            alert.success(message)
            dispatch({ type: DELETE_USER_RESET })
        }
        dispatch(getAllUsers())
    }, [dispatch, alert, error, isDeleted, deleteError, message])
    return <Fragment>
        <MetaData title={`ALL USERS -- Admin`} />
        {loading ? <Loader /> : (
            <div className="dashboard">
                <Slider />
                <div className="productListContainer" >

                    <h1 id="productsListHeading">ALL USERS</h1>
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

        )}
    </Fragment>
}
export default UserList