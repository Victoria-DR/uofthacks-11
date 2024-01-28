import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/react';
import { useAuth0 } from "@auth0/auth0-react";
import Network from '../components/Network/Network';
import UploadImage from '../components/UploadImage';
import { profileData } from '../data/manualProfileData';

const Main = () => {
    const { user } = useAuth0();
    
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        async function getUserId() {
            try {
                await axios.post("http://localhost:3001/get-user-id", {
                    email: user.email
                }).then((response) => setUserId(response.data.userId));
            } catch (err) {
                console.log(err);
            }
        };
        getUserId();
    }, [user]);

    return (
        <Box w={'100vw'} h={'100vh'} bg={'#15151f'}>
            <Network profileData={profileData} />
            <UploadImage />
        </Box>
    );
};

export default Main;