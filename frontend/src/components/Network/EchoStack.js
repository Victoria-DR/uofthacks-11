import React, { forwardRef, useContext, useMemo, useLayoutEffect, useState } from 'react';
import { Card, context, ActiveCard } from './ProfileNode';

const EchoStack = forwardRef(({echoes, ...props}, ref) => {
    const set = useContext(context);
    const [hovered, hover] = useState(null);

    const state = useMemo(
        () => ({ position: props.position, connectedTo: props.connectedTo }),
        [props]
    );

    useLayoutEffect(() => {
        set(nodes => [...nodes, state]);
        return () => void set(nodes => nodes.filter(n => n !== state));
    }, [state, props]);

    return (
        <group ref={ref} {...props}>
            {Array.from(
                {
                    length: echoes.length * 20,
                },
                (_, i) => {
                    // return a stack of cards
                    return (
                        <Card
                            key={i}
                            position={[0, 0, i * 0.1]}
                            url={`/img${Math.floor(i % 10) + 1}.jpg`}
                            onPointerOver={e => {
                                e.stopPropagation();
                                hover(i);
                            }}
                            onPointerOut={() => hover(null)}
                            hovered={hovered === i}
                        />
                    );
                }
            )}
            <ActiveCard hovered={hovered} position={[0, 0, -10]} />
        </group>
    );
});

export default EchoStack;