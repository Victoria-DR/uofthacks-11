import { React, useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useAuth0 } from "@auth0/auth0-react";
import Network from '../components/Network/Network';
import UploadImage from '../components/UploadImage';
import { profileData } from '../data/manualProfileData';
import UserService from '../services/UserService';

const Main = () => {
    const { user } = useAuth0();
    const [userId, setUserId] = useState(null);
    
    useEffect(() => {
        UserService.getUserId(user.email)
            .then((response) => setUserId(response.data.userId))
            .catch((error) => console.log(error));
    }, [user]);

    return (
        <Box w={'100%'} h={'100vh'} bg={'#15151f'}>
            <Network profileData={profileData} />
            {/* <UploadImage /> */}
        </Box>
    );
};

export default Main;