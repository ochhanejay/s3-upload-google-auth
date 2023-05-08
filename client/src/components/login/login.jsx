import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { NavLink, useNavigate } from 'react-router-dom';
import { getApiRequest, postApiRequest } from '../../api';
import { authContext } from '../../context/context';
import { GoogleLogin } from "react-google-login";
const clientId = "1040864158683-jcv3gm6vdds7hqge7o7lsf1qdcl0a3mc.apps.googleusercontent.com";


export default function LoginUser() {
    const { navbarShow, setNavbarShow, setUserName, setProfileImage } = React.useContext(authContext);

    const history = useNavigate();

    const onSuccess = async (res) => {
        console.log("Login Success! current USER :", res.profileObj);
        localStorage.setItem("userName", res.profileObj.name);
        setProfileImage(res.profileObj.imageUrl);
        setUserName(res.profileObj.name);
        const user = {
            email: res.profileObj.email,
            name: res.profileObj.name,
            profileImg: res.profileObj.imageUrl
        }

        try {
            await postApiRequest(`/signUp`, user).then(async (resp) => {

                localStorage.setItem("tokens", resp.accessToken);
                history("/showFiles");
                localStorage.setItem("navShow", "true");
                setNavbarShow(!navbarShow);

            }).catch(err => {
                if (err.response.data === "Unauthorized") {
                    alert("Invalid Credentials");
                }


            });
        } catch (error) {

        }

    }

    const onFailure = (res) => {
        console.log("Login Failed! res :", res);
    }

    return (
        <div className='App bg-black' style={{ height: "100vh", overflow: "hidden" }}>
            <Grid container justifyContent="center" className='' style={{ marginTop: "10%" }}>
                <Avatar className='glow-button' sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon className='fs-2' />
                </Avatar>
            </Grid>
            <h3 className='text-light'>Google Login</h3>
            <Grid container justifyContent="center" className='my-5 '>
                <Grid item>
                    <GoogleLogin
                        clientId={clientId}
                        className='glow-button w-100'
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />
                </Grid>
            </Grid>
        </div>


    );
}