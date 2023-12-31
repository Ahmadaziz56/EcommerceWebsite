import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import Loader from "../layout/loader/loader"
import {useSelector} from "react-redux"
import MetaData from "../layout/MetaData"
const Profile = () => {
    const {user,loading,isAuthenticated}=useSelector(state=>state.user)
    return (
    <Fragment>
        {loading ? <Loader/> : (
            <Fragment>
            <MetaData title={`${user.name}'s Profile`} />
            <div className="profileContainer">
                <div>
                    <h1>My Profile</h1>
                    <img
                        src={user.avatar.url}
                        alt={user.name}
                    />
                    <Link to="/me/update">Edit Profile</Link>
                </div>
                <div>

                    <div>
                        <h4><i class="fa-solid fa-pen-fancy"></i>Full Name</h4>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <h4><i class="fa-regular fa-envelope"></i>Email</h4>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h4><i class="fa-regular fa-calendar"></i>Joined On</h4>
                        <p>{String(user.createdAt).substr(0, 10)}</p>
                    </div>
                    <div>
                        <Link to="orders">My Orders</Link>
                        <Link to="password/update">Change Password</Link>
                    </div>

                </div>
            </div>
        </Fragment>
        )}
    </Fragment>
    )
}
export default Profile