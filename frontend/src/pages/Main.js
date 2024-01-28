import { React, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useAuth0 } from "@auth0/auth0-react";
import Network from '../components/Network/Network';
import { profileData } from '../data/manualProfileData';
import UserService from '../services/UserService';
import { useUser } from '../contexts/UserContext';
import { setProfilePositions } from '../helpers/graph.helpers';

const Main = () => {
    const { user } = useAuth0();
    const { setUserId: setContextUserId } = useUser();
    
    useEffect(() => {
        UserService.getUserId(user.email)
            .then(response => setContextUserId(response.data.userId))
            .catch(error => console.log(error));
    }, [user, setContextUserId]);

    return (
        <Box w={'100%'} h={'100vh'} bg={'#15151f'}>
            <Network profileData={setProfilePositions(profileData)} />
            {/* <UploadImage /> */}
        </Box>
    );
};

export default Main;