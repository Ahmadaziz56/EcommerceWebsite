import React, { Fragment, useEffect, useState } from "react"
import Loader from "../layout/loader/loader.js"
// import { useNavigate,useParams } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, forgetPassword } from "../../actions/userAction"
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData.js"
const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    
    const { error, loading, message } = useSelector((state) => state.forgetPassword);
    const [email, setEmail] = useState("")
    const forgetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgetPassword(myForm));
    };
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message);
        }
    }, [dispatch, error, alert,message, ]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Forget Password" />
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">
                            <h2 className="updateProfileHeading">Forget Password</h2>

                            <form
                                className="updateProfileForm"
                                onSubmit={forgetPasswordSubmit}
                            >
                                <div className="signUpEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Send"
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
export default ForgotPassword