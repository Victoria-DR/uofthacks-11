import React from 'react';
import { Box } from '@chakra-ui/react';
import Network from '../components/Network/Network';
import { profileData } from '../data/manualProfileData';

const Main = () => {
    return (
        <Box w={'100vw'} h={'100vh'} bg={'#15151f'}>
            <Network profileData={profileData} />
        </Box>
    );
};

export default Main;