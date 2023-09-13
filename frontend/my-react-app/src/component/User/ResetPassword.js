import React, { Fragment, useEffect, useState } from "react"
import Loader from "../layout/loader/loader.js"
import { useNavigate,useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { clearErrors, resetPassword } from "../../actions/userAction"
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData.js"
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant.js";
const ResetPassword=()=>{
    const dispatch = useDispatch();
    const alert = useAlert();
    const {token}=useParams()
    const navigate = useNavigate()
    const { error, success, loading } = useSelector((state) => state.forgetPassword);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(token,myForm));
    };

    useEffect(() => {
       

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password Updated Successfully");

            navigate("/login");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, alert, navigate, success]);
    return(
        <Fragment>
        {loading ? (
            <Loader />
        ) : (
            <Fragment>
                <MetaData title="Reset Password" />
                <div className="LoginSignUpContainer">
                    <div className="LoginSignUpBox">
                        <h2 className="updateProfileHeading">Reset Profile</h2>

                        <form
                            className="updateProfileForm"
                            encType="multipart/form-data"
                            onSubmit={resetPasswordSubmit}
                        >
                            <div className="loginPassword">
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="loginPassword">
                                <LockIcon />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <input
                                type="submit"
                                value="Update"
                                className="signUpBtn"
                            />
                        </form>
                    </div>
                </div>
            </Fragment>
        )}
    </Fragment>
    )
}
export default ResetPassword