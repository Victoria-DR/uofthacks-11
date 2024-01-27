import * as THREE from 'three';
import {
    useLayoutEffect,
    useRef,
    useState,
    useMemo,
    createContext,
    forwardRef,
    useContext,
} from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import {
    Image,
    useScroll,
    Billboard,
    Text,
    QuadraticBezierLine,
} from '@react-three/drei';
import { easing, geometry } from 'maath';

extend(geometry);

const context = createContext();

const Circle = forwardRef(
    (
        {
            children,
            opacity = 0,
            radius = 0.05,
            segments = 32,
            color = '#ff1050',
            ...props
        },
        ref
    ) => (
        <mesh ref={ref} {...props}>
            <circleGeometry args={[radius, segments]} />
            <meshBasicMaterial
                transparent={opacity < 1}
                opacity={opacity}
                color={color}
            />
            {children}
        </mesh>
    )
);

export const ProfileNodes = ({ children }) => {
    const group = useRef();
    const [nodes, set] = useState([]);

    const lines = useMemo(() => {
        const lines = [];
        for (let node of nodes)
            node.connectedTo
                .map(ref => [node.position, ref.current.position])
                .forEach(([start, end]) => {
                    let startVector = new THREE.Vector3(...start);
                    lines.push({
                        start: startVector.clone().add({ x: 0.35, y: 0, z: 0 }),
                        end: end.clone().add({ x: -0.35, y: 0, z: 0 }),
                    })
                }
                );
        return lines;
    }, [nodes]);

    useFrame((_, delta) =>
        group.current.children.forEach(
            group =>
                (group.children[0].material.uniforms.dashOffset.value -=
                    delta * 2.5)
        )
    );

    return (
        <context.Provider value={set}>
            <group ref={group}>
                {lines.map((line, index) => (
                    <group>
                        <QuadraticBezierLine
                            key={index}
                            {...line}
                            color="white"
                            dashed
                            dashScale={10}
                            gapSize={20}
                            lineWidth={2}
                            transparent
                            opacity={0.5}
                        />
                        <QuadraticBezierLine
                            key={index}
                            {...line}
                            color="white"
                            lineWidth={2}
                            transparent
                            opacity={0.25}
                        />
                    </group>
                ))}
            </group>
            {children}
            {lines.map(({ start, end }, index) => (
                <group key={index} position-z={1}>
                    <Circle position={start} />
                    <Circle position={end} />
                </group>
            ))}
        </context.Provider>
    );
};

export const ProfileNode = forwardRef(({ children, ...props }, ref) => {
    const set = useContext(context);
    // const scroll = useScroll();
    const [hovered, hover] = useState(null);
    // useFrame((state, delta) => {
    //     ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents
    //     state.events.update(); // Raycasts every frame rather than on pointer-move
    //     // easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y * 2 + 4.5, 9], 0.3, delta)
    //     // state.camera.lookAt(0, 0, 0);
    //     // state.camera.position.set(0, 6, 10);
    // });

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
            <Cards
                // category="spring"
                from={0}
                len={Math.PI * 2}
                onPointerOver={hover}
                onPointerOut={hover}
                profileUrl={props.url}
                nodePosition={props.position}
            />
            {/* <Cards
                category="summer"
                from={Math.PI / 4}
                len={Math.PI / 2}
                position={[0, 0.4, 0]}
                onPointerOver={hover}
                onPointerOut={hover}
            />
            <Cards
                category="autumn"
                from={Math.PI / 4 + Math.PI / 2}
                len={Math.PI / 2}
                onPointerOver={hover}
                onPointerOut={hover}
            />
            <Cards
                category="winter"
                from={Math.PI * 1.25}
                len={Math.PI * 2 - Math.PI * 1.25}
                position={[0, -0.4, 0]}
                onPointerOver={hover}
                onPointerOut={hover}
            /> */}
            <ActiveCard hovered={hovered} />
        </group>
    );
})

function Cards({
    category,
    data,
    from = 0,
    len = Math.PI * 2,
    radius = 5.25,
    onPointerOver,
    onPointerOut,
    profileUrl,
    ...props
}) {
    const { camera } = useThree();
    const [hovered, hover] = useState(null);
    const amount = Math.round(len * 22);
    const textPosition = from + (amount / 2 / amount) * len;
    return (
        <group {...props}>
            <Billboard
                position={[
                    Math.sin(textPosition) * radius * 1.4,
                    0.5,
                    Math.cos(textPosition) * radius * 1.4,
                ]}
            >
                <Text fontSize={0.25} anchorX="center" color="black">
                    {category}
                </Text>
            </Billboard>
            <Billboard position={[0, 0, 0]}>
                {/* User profile picture */}
                <Image
                    url={profileUrl}
                    onPointerDown={() => {
                        console.log('clicked');
                        // camera.position.set(
                        //     props.nodePosition[0],
                        //     props.nodePosition[1],
                        //     20
                        // );
                    }}
                    onPointerOver={e => document.body.style.cursor = 'pointer'}
                    onPointerOut={e => document.body.style.cursor = 'auto'}
                >
                    <roundedPlaneGeometry
                        parameters={{ width: 5, height: 5 }}
                        args={[5, 5, 2.5]}
                    />
                </Image>
            </Billboard>
            {Array.from(
                {
                    length: amount,
                    // -3 /* minus 3 images at the end, creates a gap */,
                },
                (_, i) => {
                    const angle = from + (i / amount) * len;
                    return (
                        <Card
                            key={angle}
                            onPointerOver={e => (
                                e.stopPropagation(), hover(i), onPointerOver(i)
                            )}
                            onPointerOut={() => (
                                hover(null), onPointerOut(null)
                            )}
                            position={[
                                Math.sin(angle) * radius,
                                0,
                                Math.cos(angle) * radius,
                            ]}
                            rotation={[0, Math.PI / 2 + angle, 0]}
                            active={hovered !== null}
                            hovered={hovered === i}
                            url={`/img${Math.floor(i % 10) + 1}.jpg`}
                        />
                    );
                }
            )}
        </group>
    );
}


export function Card({ url, active, hovered, ...props }) {
    const ref = useRef();
    useFrame((state, delta) => {
        const f = hovered ? 1.4 : active ? 1.25 : 1;
        easing.damp3(
            ref.current.position,
            [0, hovered ? 0.25 : 0, 0],
            0.1,
            delta
        );
        easing.damp3(ref.current.scale, [1.618 * f, 1 * f, 1], 0.15, delta);
    });
    return (
        <group {...props}>
            <Image
                ref={ref}
                url={url}
                scale={[1.618, 1, 1]}
                side={THREE.DoubleSide}
            />
        </group>
    );
}

function ActiveCard({ hovered, ...props }) {
    const ref = useRef();
    const name = 'lorem ipsum';
    useLayoutEffect(() => void (ref.current.material.zoom = 0.8), [hovered]);
    useFrame((state, delta) => {
        // easing.damp(ref.current.material, 'zoom', 1, 0.5, delta);
        easing.damp(
            ref.current.material,
            'opacity',
            hovered !== null,
            0.3,
            delta
        );
    });
    return (
        <Billboard {...props}>
            <Text
                fontSize={0.5}
                position={[2.15, 3.85, 0]}
                anchorX="left"
                color="black"
            >
                {hovered !== null && `${name}\n${hovered}`}
            </Text>
            <Image
                ref={ref}
                transparent
                position={[0, 1.5, 0]}
                url={`/img${Math.floor(hovered % 10) + 1}.jpg`}
            >
                <roundedPlaneGeometry
                    parameters={{ width: 3.5, height: 1.618 * 3.5 }}
                    args={[3.5, 1.618 * 3.5, 0]}
                />
            </Image>
        </Billboard>
    );
}
