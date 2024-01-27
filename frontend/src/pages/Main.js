import React from 'react';
import { Box } from '@chakra-ui/react';
import Network from '../components/Network/Network';
import UploadImage from '../components/UploadImage';

const Main = () => {
    return (
        <Box w={'100%'} h={'95vh'}>
            <UploadImage />
            <Network />
        </Box>
    );
};

export default Main;