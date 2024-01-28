import React, { useEffect } from 'react';
import {
    Box,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import EXIF from 'exif-js';
import EchoService from '../services/EchoService';
import { useUser } from '../contexts/UserContext';
import {Web3Storage} from "web3.storage"

const AddEcho = ({ isOpen, onOpen, onClose }) => {
    const [image, setImage] = React.useState(null);
    const [friendName, setFriendName] = React.useState(null);
    const [imageBase64, setImageBase64] = React.useState(null);
    const [caption, setCaption] = React.useState(null);
    const [date, setDate] = React.useState(null);
    const [location, setLocation] = React.useState(null);
    const { userId } = useUser();
    function makeStorageClient() {
        return new Web3Storage({ token: "did:key:z6MkmxpPoEh5EQroAqMqS54xN6N1iWzFdnPQnnq2TXbiqUHa" })
    }
    const client = makeStorageClient()
    async function storeFiles(base64, name) {
        try {
            console.log("Storing files...");
    
            // Convert base64 to a Blob
            const blob = await fetch(base64).then(res => res.blob());
    
            // Create a file object from the Blob
            const file = new File([blob], name, { type: blob.type });
    
            // Use an array of files in the put method
            const cid = await client.put([file]);
    
            console.log("Stored files with CID:", cid);
            return cid;
        } catch (error) {
            console.error("Error storing files:", error);
            throw error;
        }
    }
    
    
    
    var cidOfImage;
    async function onSubmit() {
        console.log(image);
        const base64 = await convertBase64(image);
        setImageBase64(base64);
        cidOfImage = await storeFiles(base64, "image");
        console.log(cidOfImage);
    }    

    // useEffect(() => {
    //     if(image) {
    //         onSubmit();
    //     }
    // }, [image])

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

        EchoService.addEcho(
            userId,
            {
                text: caption,
                imageSrc: base64,
                date: dateTaken || new Date(),
                location: location || '',
            }
        );
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
                accept='image/*'
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
                                value={caption}
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
                                // onClick={handleAddFriend}
                                onClick={onSubmit}

                            >
                                Add Echo
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
