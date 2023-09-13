import React, { Fragment } from "react"
import { useSelector } from "react-redux"
import { Route, Navigate, Routes } from "react-router-dom"
const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
    const { isAuthenticated, user, loading } = useSelector(state => state.user)
    return (
        <Fragment>

            {!loading && (
                <Routes>
                    <Route
                        {...rest}
                        render={(props) => {
                            if (isAuthenticated) {
                                return <Navigate to="/login" />
                            }
                            if(isAdmin === true && user.role !== "admin") {
                                return <Navigate to="/login" />
                            }
                    return <Component {...props} />
                        }}
                    />
                </Routes>
            )}
        </Fragment>
    )
}
export default ProtectedRoute