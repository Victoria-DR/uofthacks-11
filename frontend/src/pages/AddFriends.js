import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useContext } from 'react';
import axios from 'axios';

const AddFriends = ({ isOpen, onOpen, onClose }) => {
    const [image, setImage] = React.useState(null);
    const [friendName, setFriendName] = React.useState(null);
    const [imageBase64, setImageBase64] = React.useState(null);

    const convertBase64 = file => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = error => {
                reject(error);
            };
        });
    };

    const handleAddFriend = async () => {
        const file = image;
        const base64 = await convertBase64(file);
        setImageBase64(base64);
        await axios
            .post('http://localhost:5000/add-friend', {
                name: friendName,
                image: base64,
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const CustomImageButton = () => (
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
            <img
                src={require("../assets/downloadIcon.png")} // Make sure the path is correct
                alt="Add files"
                style={{
                    width: '50px',
                    height: '50px',
                    padding: '10px',
                    borderRadius: '50%',
                    border: '1px dashed black',
                    marginBottom: '8px',
                }}
            />
            <p>Upload Image</p>
            <p style={{ fontSize: "14px" }}>Drag and drop image here</p>
            <input
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => setImage(e.target.files[0])}
            />
        </label>
    );
    

    return (
        <>
            <Box
                backgroundColor={'#15151f'}
                height={'90vh'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
            >
                <Box backgroundColor={"#F0F0F0"} padding={"10px"} display={"flex"} borderRadius={"8px"} flexDirection={"column"}>
                    {image && (
                        <>
                            <img
                                style={{
                                    height: '400px',
                                    width: '400px',
                                    borderRadius: '10px',
                                }}
                                src={URL.createObjectURL(image)}
                                alt="profile"
                            />

                            <input
                                style={{
                                    marginTop: '10px',
                                    border: '1px solid black',
                                    padding: '4px',
                                    borderRadius: '5px',
                                }}
                                type="text"
                                value={friendName}
                                onChange={e => setFriendName(e.target.value)}
                                placeholder="Type your friend’s name"
                            />
                            <Button
                                style={{ marginTop: '10px' }}
                                onClick={() => console.log('YO')}
                            >
                                Add Friend
                            </Button>
                            {/* <Button onClick={() => console.log('YO')}>Next</Button> */}
                        </>
                    )}
                    {!image && (
                        <>
                            <h1 style={{ textAlign: 'center', fontWeight: "bold" }}>
                                Add a Friend
                            </h1>
                            <CustomImageButton />
                            {/* <Button onClick={handleAddFriend}>Upload Image</Button> */}
                        </>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default AddFriends;
