import React, { createRef, useEffect } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { ScrollControls, MapControls, Html } from '@react-three/drei';
import { geometry } from 'maath';
import { ProfileNode, ProfileNodes } from './ProfileNode';
import AddFriends from '../../pages/AddFriends';
import {
    calculateCenter,
    calculateConnections,
    getAllEchoes,
    getCommonEchoes,
    groupCommonEchoesByProfileCombination,
} from '../../helpers/network.helpers';
import EchoStack from './EchoStack';

extend(geometry);

const Network = ({profileData}) => {
    const profileNodeRefs = Object.fromEntries(profileData.map((profile) => [profile.id, createRef()]))
    const [isOpen, setIsOpen] = React.useState(false);
    const processedProfileData = calculateConnections(profileData);
    
    const commonEchoes = getCommonEchoes(profileData);
    const echoesByProfileCombination = groupCommonEchoesByProfileCombination(commonEchoes)
    const echoStackRefs = Object.entries(echoesByProfileCombination).map(
        ([k, v], i) => createRef()
    );

    const allEchoes = getAllEchoes(profileData);

    return (
        <Canvas
            dpr={[1, 1.5]}
            camera={{
                position: [0, 0, 20],
                zoom: 1,
                up: [0, 0, 1],
                far: 10000,
            }}
        >
            {/* <Html>
                <AddFriends isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </Html> */}
            <ScrollControls pages={1} infinite makeDefault>
                <ProfileNodes>
                    {processedProfileData.map((profile, i) => (
                        <ProfileNode
                            key={i}
                            position={profile.position}
                            url={profile.profilePicture}
                            ref={profileNodeRefs[profile.id]}
                            // connectedTo={profile.connectedTo.map(
                            //     id => profileNodeRefs[id]
                            // )}
                            connectedTo={[]}
                        />
                    ))}
                    {Object.entries(echoesByProfileCombination).map(
                        ([k, v], i) => {
                            const profiles = k
                                .split(',')
                                .map(id =>
                                    profileData.find(
                                        profile => profile.id === Number(id)
                                    )
                                );
                            return (
                                <EchoStack
                                    key={i}
                                    echoes={v.map(echoId =>
                                        allEchoes.find(
                                            echo => echo.id === echoId
                                        )
                                    )}
                                    position={calculateCenter(profiles)}
                                    ref={echoStackRefs[i]}
                                    connectedTo={profiles.map(
                                        profile => profileNodeRefs[profile.id]
                                    )}
                                />
                            );
                        }
                    )}
                </ProfileNodes>
                <MapControls makeDefault={false} />
            </ScrollControls>
        </Canvas>
    );
};

export default Network;
