import React, { forwardRef, useContext, useMemo, useLayoutEffect } from 'react';
import { Card, context } from './ProfileNode';

const EchoStack = forwardRef(({echoes, ...props}, ref) => {
    const set = useContext(context);

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
});

export default EchoStack;