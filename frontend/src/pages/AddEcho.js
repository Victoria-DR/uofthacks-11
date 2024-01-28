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
import EXIF from 'exif-js';

const AddEcho = ({ isOpen, onOpen, onClose }) => {
    const [image, setImage] = React.useState(null);
    const [friendName, setFriendName] = React.useState(null);
    const [imageBase64, setImageBase64] = React.useState(null);
    const [caption, setCaption] = React.useState(null);
    const [date, setDate] = React.useState(null);
    const [location, setLocation] = React.useState(null);

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const readImageMetadata = (image) => {
        return new Promise((resolve, reject) => {
            EXIF.getData(image, function () {
                const dateTaken = EXIF.getTag(this, 'DateTimeOriginal');
                const lat = EXIF.getTag(this, 'GPSLatitude');
                const lon = EXIF.getTag(this, 'GPSLongitude');

                let formattedLat = null;
                let formattedLon = null;

                if (lat !== undefined) {
                    formattedLat = `${lat[0]}°${lat[1] ? `${lat[1]}'${lat[2]}" ${lat[3]}` : ''}`;
                }

                if (lon !== undefined) {
                    formattedLon = `${lon[0]}°${lon[1] ? `${lon[1]}'${lon[2]}" ${lon[3]}` : ''}`;
                }

                let location = null;

                if (formattedLat !== null && formattedLon !== null) {
                    location = { latitude: formattedLat, longitude: formattedLon };
                }

                resolve({ dateTaken, location });
            });
        });
    };

    const handleAddFriend = async () => {
        const file = image;
        const base64 = await convertBase64(file);
        setImageBase64(base64);

        const { dateTaken, location } = await readImageMetadata(file);
        setDate(dateTaken);
        setLocation(location);

        // await axios
        //     .post('http://localhost:5000/add-echo', {
        //         name: friendName,
        //         image: base64,
        //         caption: caption,
        //         date: dateTaken || new Date(),
        //         location: location || null,
        //     })
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    };

    const CustomImageButton = () => (
        <label
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
            }}
        >
            <img
                src={require('../assets/downloadIcon.png')} // Make sure the path is correct
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
            <p style={{ fontSize: '14px' }}>Drag and drop image here</p>
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
                height={'100%'}
                padding={"10px"}
                minHeight={"90vh"}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
            >
                <Box
                    backgroundColor={'#F0F0F0'}
                    padding={'10px'}
                    display={'flex'}
                    borderRadius={'8px'}
                    flexDirection={'column'}
                >
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
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder="Caption Here"
                            />
                            {date && (
                                <p style={{ marginTop: '10px' }}>
                                    Date Taken: {date}
                                </p>
                            )}
                            {location && (
                                <p style={{ marginTop: '10px' }}>
                                    Location: {location.latitude.split("undefined")[0]}{' '}
                                    {location.longitude.split("undefined")[0]}
                                </p>
                            )}
                            <Button
                                style={{ marginTop: '10px' }}
                                onClick={handleAddFriend}
                            >
                                Add Friend
                            </Button>
                        </>
                    )}
                    {!image && (
                        <>
                            <h1
                                style={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                }}
                            >
                                Add an Echo
                            </h1>
                            <CustomImageButton />
                        </>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default AddEcho;
