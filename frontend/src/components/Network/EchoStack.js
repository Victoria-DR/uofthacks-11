import React from 'react';
import { Card } from './ProfileNode';

const EchoStack = ({echoes, ...props}) => {
    return (
        <group {...props}>
            {
                Array.from(
                    {
                        length: echoes.length * 20
                    },
                    (_, i) => {
                        // return a stack of cards
                        return (
                            <Card
                                key={i}
                                position={[0, 0, i * 0.1]}
                                url={`/img${Math.floor(i % 10) + 1}.jpg`}
                            />
                        )
                    }
                )
            }
        </group>
    );
};

export default EchoStack;