import React from 'react';
import {
    Box,
    Image,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,

} from '@chakra-ui/react';
import { useActiveEcho } from '../../contexts/ActiveEchoContext';

const Echo = () => {
    const { activeEcho, isActiveEchoOpen, setIsActiveEchoOpen } =
        useActiveEcho();

    return (
        <Modal
            isOpen={isActiveEchoOpen}
            onClose={() => setIsActiveEchoOpen(false)}
        >
            {/* <ModalOverlay /> */}
            <ModalContent
                top={'50%'}
                mt={'-200px'}
                w={'340px'}
                h={'400px'}
                p={'23px'}
                pb={'89px'}
                rounded={2}
                bg={'white'}
            >
                {activeEcho && (
                    <Image
                        src={activeEcho.imageSrc}
                        h={'100%'}
                        objectFit={'cover'}
                    />
                )}
            </ModalContent>
        </Modal>
        // <Box
        //     hidden={!isActiveEchoOpen}
        //     position={'fixed'}
        //     w={'340px'}
        //     h={'400px'}
        //     top={'50%'}
        //     left={'50%'}
        //     mt={'-170px'}
        //     ml={'-200px'}
        //     bg={'white'}
        // >
        //     {/* {activeEcho && (
        //         <Image
        //             src={activeEcho.imageSrc}
        //             w={'100%'}
        //             h={'100%'}
        //             top={'50%'}
        //             left={'50%'}
        //             translateX={'-50% 0'}
        //             translateY={'-50% 0'}
        //         />
        //     )} */}
        //     <Button onClick={() => setIsActiveEchoOpen(false)}>Close</Button>
        // </Box>
    );
};

export default Echo;