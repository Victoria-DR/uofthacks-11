import { React, useEffect, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import Network from '../components/Network/Network';
import { profileData } from '../data/manualProfileData';
import UserService from '../services/UserService';
import { useUser } from '../contexts/UserContext';
import Logo from '../assets/images/logo.svg';
import EXIF from 'exif-js';
import EchoService from '../services/EchoService';
import '../assets/styles/Main.css';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';

const Main = () => {
    // AUTH0
    const { user } = useAuth0();
    const { setUserId: setContextUserId } = useUser();
    useEffect(() => {
        UserService.getUserId(user.email)
            .then(response => setContextUserId(response.data.userId))
            .catch(error => console.log(error));
    }, [user, setContextUserId]);

    // MODALS
    const [isFriendOpen, setFriendOpen] = useState(false);
    const [isEchoOpen, setEchoOpen] = useState(false);

    // ADD
    const { userId } = useUser();
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

    // ADD FRIEND
    const [friendImage, setFriendImage] = useState(null);
    const [friendName, setFriendName] = useState(null);

    const handleAddFriend = async () => {
        const file = friendImage;
        const base64 = await convertBase64(file);
        UserService.addFriend(userId, friendName, base64);
        setFriendOpen(false);
    };

    const CustomFriendImageButton = () => (
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
                onChange={e => setFriendImage(e.target.files[0])}
            />
        </label>
    );

    // ADD ECHO
    const [echoImage, setEchoImage] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [caption, setCaption] = useState(null);
    const [date, setDate] = useState(null);
    const [location, setLocation] = useState(null);

    const readImageMetadata = image => {
        return new Promise((resolve, reject) => {
            EXIF.getData(image, function () {
                const dateTaken = EXIF.getTag(this, 'DateTimeOriginal');
                const lat = EXIF.getTag(this, 'GPSLatitude');
                const lon = EXIF.getTag(this, 'GPSLongitude');

                let formattedLat = null;
                let formattedLon = null;

                if (lat !== undefined) {
                    formattedLat = `${lat[0]}°${
                        lat[1] ? `${lat[1]}'${lat[2]}" ${lat[3]}` : ''
                    }`;
                }

                if (lon !== undefined) {
                    formattedLon = `${lon[0]}°${
                        lon[1] ? `${lon[1]}'${lon[2]}" ${lon[3]}` : ''
                    }`;
                }

                let location = null;

                if (formattedLat !== null && formattedLon !== null) {
                    location = {
                        latitude: formattedLat,
                        longitude: formattedLon,
                    };
                }

                resolve({ dateTaken, location });
            });
        });
    };

    const handleAddEcho = async () => {
        const file = echoImage;
        const base64 = await convertBase64(file);
        setImageBase64(base64);

        const { dateTaken, location } = await readImageMetadata(file);
        setDate(dateTaken);
        setLocation(location);

        EchoService.addEcho(userId, {
            text: caption,
            imageSrc: base64,
            date: dateTaken || new Date(),
            location: location || '',
        });

        setEchoOpen(false);
    };

    const CustomEchoImageButton = () => (
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
                onChange={e => setEchoImage(e.target.files[0])}
            />
        </label>
    );

    return (
        <div className="main">
            <Box className="main-box">
                <img className="main-logo" src={Logo} alt="echo logo" />
                <Network className="main-network" profileData={profileData} />
                <button
                    className="main-add-button"
                    id="add-friend-button"
                    onClick={() => setFriendOpen(true)}
                >
                    <img
                        className="main-add-icon"
                        src="https://api.iconify.design/tabler:user-plus.svg?color=%23f0f0f0"
                        alt="add echo icon"
                    />
                    <p className="main-add-text">Add Friend</p>
                </button>
                <button
                    className="main-add-button"
                    id="add-echo-button"
                    onClick={() => setEchoOpen(true)}
                >
                    <img
                        className="main-add-icon"
                        src="https://api.iconify.design/tabler:photo-circle-plus.svg?color=%23f0f0f0"
                        alt="add user icon"
                    />
                    <p className="main-add-text">Add Echo</p>
                </button>
            </Box>

            <Modal
                isOpen={isFriendOpen}
                onClose={() => setFriendOpen(false)}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="main-modal-header">
                        Add Friend
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody style={{ marginBottom: '10px' }}>
                        {friendImage && (
                            <>
                                <img
                                    style={{
                                        height: '400px',
                                        width: '400px',
                                        borderRadius: '10px',
                                    }}
                                    src={URL.createObjectURL(friendImage)}
                                    alt="profile"
                                />
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginTop: '10px',
                                    }}
                                >
                                    <input
                                        style={{
                                            marginTop: '10px',
                                            border: '1px solid black',
                                            padding: '4px',
                                            borderRadius: '5px',
                                        }}
                                        type="text"
                                        value={friendName}
                                        onChange={e =>
                                            setFriendName(e.target.value)
                                        }
                                        placeholder="Your friend's name"
                                    />
                                    <Button
                                        className="main-modal-button"
                                        onClick={() => handleAddFriend()}
                                    >
                                        Add Friend
                                    </Button>
                                </div>
                            </>
                        )}
                        {!friendImage && (
                            <>
                                <h1
                                    style={{
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Add a Friend
                                </h1>
                                <CustomFriendImageButton />
                            </>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal
                isOpen={isEchoOpen}
                onClose={() => setEchoOpen(false)}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="main-modal-header">
                        Add Echo
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody style={{ marginBottom: '10px' }}>
                        {echoImage && (
                            <>
                                <img
                                    style={{
                                        height: '400px',
                                        width: '400px',
                                        borderRadius: '10px',
                                    }}
                                    src={URL.createObjectURL(echoImage)}
                                    alt="profile"
                                />
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginTop: '10px',
                                    }}
                                >
                                    <input
                                        style={{
                                            marginTop: '10px',
                                            border: '1px solid black',
                                            padding: '4px',
                                            borderRadius: '5px',
                                        }}
                                        type="text"
                                        value={caption}
                                        onChange={e =>
                                            setCaption(e.target.value)
                                        }
                                        placeholder="Caption here"
                                    />
                                    {date && (
                                        <p style={{ marginTop: '10px' }}>
                                            Date Taken: {date}
                                        </p>
                                    )}
                                    {location && (
                                        <p style={{ marginTop: '10px' }}>
                                            Location:{' '}
                                            {
                                                location.latitude.split(
                                                    'undefined'
                                                )[0]
                                            }{' '}
                                            {
                                                location.longitude.split(
                                                    'undefined'
                                                )[0]
                                            }
                                        </p>
                                    )}
                                    <Button
                                        className="main-modal-button"
                                        onClick={handleAddEcho}
                                    >
                                        Add Echo
                                    </Button>
                                </div>
                            </>
                        )}
                        {!echoImage && (
                            <>
                                <h1
                                    style={{
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Add an Echo
                                </h1>
                                <CustomEchoImageButton />
                            </>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Main;
