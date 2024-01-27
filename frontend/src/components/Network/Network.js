import { Canvas, extend } from '@react-three/fiber';
import {
    ScrollControls,
    MapControls
} from '@react-three/drei';
import { geometry } from 'maath';
import { ProfileNode } from './ProfileNode';

extend(geometry);

const Network = () => {
    return (
        <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 20], zoom: 1, up: [0, 0, 1], far: 10000 }}
        >
            <ScrollControls infinite makeDefault>
                <ProfileNode position={[0, 0, 0]} />
                <ProfileNode position={[10, 10, 0]} />
                <MapControls makeDefault={false} />
            </ScrollControls>
        </Canvas>
    );
};



export default Network;
