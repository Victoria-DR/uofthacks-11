import React from 'react';
import {
    Box,
    Image,
    Button,
    Modal,
    Text,
    ModalContent,
    Heading,
    Flex,
} from '@chakra-ui/react';
import { useActiveEcho } from '../../contexts/ActiveEchoContext';
import { IoMdClose } from 'react-icons/io';


const Echo = () => {
    const { activeEcho, isActiveEchoOpen, setIsActiveEchoOpen } =
        useActiveEcho();

    return (
        <Modal
            isOpen={isActiveEchoOpen}
            onClose={() => setIsActiveEchoOpen(false)}
            position={'relative'}
        >
            <ModalContent
                top={'50%'}
                mt={'-200px'}
                w={'340px'}
                h={'400px'}
                p={'23px'}
                pb={'89px'}
                rounded={2}
                bg={'rgba(41, 41, 51, 0.8)'}
                boxShadow={'0px 0px 20px rgba(200, 200, 200, 0.4)'}
                backdropFilter={'blur(2px)'}
            >
                {activeEcho && (
                    <Image
                        src={activeEcho.imageSrc}
                        h={'100%'}
                        objectFit={'cover'}
                    />
                )}
                <Box position={'absolute'} h={'65px'} bottom={'23px'} py={3}>
                    <Heading
                        fontFamily={'Syne'}
                        fontWeight={700}
                        color={'#f0f0f0'}
                        fontSize={'23px'}
                    >
                        {activeEcho && activeEcho.caption}
                    </Heading>
                    <Text
                        fontFamily={'Syne'}
                        fontWeight={400}
                        color={'#f0f0f0'}
                    >
                        {activeEcho && activeEcho.date}
                    </Text>
                </Box>
                <Box
                    position={'absolute'}
                    px={16}
                    bottom={-20}
                    left={0}
                    w={'full'}
                >
                    <Flex gap={4}>
                        <Button
                            leftIcon={<IoMdClose />}
                            px={2}
                            w={32}
                            rounded={'xl'}
                            bg={'rgba(255, 164, 27, 0.8)'}
                            backdropFilter={'blur(2px)'}
                            fontFamily={'Syne'}
                            fontWeight={500}
                            onClick={() => setIsActiveEchoOpen(false)}
                        >
                            Close
                        </Button>
                        <Button
                            px={2}
                            leftIcon={
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clip-path="url(#clip0_17_856)">
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M11.807 19.8948L2.25195 21.2598L11.9999 1.76384L21.7479 21.2598L12.1929 19.8948L11.9999 19.123L11.807 19.8948ZM5.74788 18.74L10.1929 18.105L11.9999 10.8768L13.807 18.105L18.252 18.74L11.9999 6.23597L5.74788 18.74Z"
                                            fill="black"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_17_856">
                                            <rect
                                                width="24"
                                                height="24"
                                                fill="white"
                                                transform="matrix(0 -1 1 0 0 24)"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            }
                            w={32}
                            rounded={'xl'}
                            bg={'rgba(255, 164, 27, 0.8)'}
                            backdropFilter={'blur(2px)'}
                            fontFamily={'Syne'}
                            fontWeight={500}
                        >
                            Send
                        </Button>
                    </Flex>
                </Box>
            </ModalContent>
        </Modal>
    );
};

export default Echo;