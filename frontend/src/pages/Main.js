import { React, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Network from '../components/Network/Network';
import { profileData } from '../data/manualProfileData';
import UserService from '../services/UserService';
import { useUser } from '../contexts/UserContext';
import Logo from "../assets/images/logo.svg";
import "../assets/styles/Main.css";

const Main = () => {
    const navigate = useNavigate();

    const { user } = useAuth0();
    const { setUserId: setContextUserId } = useUser();
    
    useEffect(() => {
        UserService.getUserId(user.email)
            .then(response => setContextUserId(response.data.userId))
            .catch(error => console.log(error));
    }, [user, setContextUserId]);

    return (
        <div className="main">
            <Box className="main-box">
                <img className="main-logo" src={Logo} alt="echo logo" />
                <Network className="main-network" profileData={profileData} />
                <button className="main-add-button" id="add-friend-button" onClick={() => navigate("/add-friends")}>
                    <img className="main-add-icon" src="https://api.iconify.design/tabler:user-plus.svg?color=%23f0f0f0" alt="add echo icon"/>
                    <p className="main-add-text">Add Friend</p>
                </button>
                <button className="main-add-button" id="add-echo-button" onClick={() => navigate("/add-echo")}>
                    <img className="main-add-icon" src="https://api.iconify.design/tabler:photo-circle-plus.svg?color=%23f0f0f0" alt="add user icon" />
                    <p className="main-add-text">Add Echo</p>
                </button>
            </Box>
        </div>
    );
};

export default Main;