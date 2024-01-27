import React, { createRef } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import {
    ScrollControls,
    MapControls
} from '@react-three/drei';
import { geometry } from 'maath';
import { ProfileNode, ProfileNodes } from './ProfileNode';

extend(geometry);

const Network = ({profileData}) => {
    const profileNodeRefs = Object.fromEntries(profileData.map((profile) => [profile.id, createRef()]))

    return (
        <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 20], zoom: 1, up: [0, 0, 1], far: 10000 }}
        >
            <ScrollControls infinite makeDefault>
                <ProfileNodes>
                    {
                        profileData.map((profile, i) => (
                            <ProfileNode key={i} position={profile.position} url={profile.profileUrl} ref={profileNodeRefs[profile.id]} connectedTo={
                                profile.connectedTo.map((id) => profileNodeRefs[id])
                            } />
                        ))
                    }
                </ProfileNodes>
                <MapControls makeDefault={false} />
            </ScrollControls>
        </Canvas>
    );
};



export default Network;
