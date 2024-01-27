import { Echo, Profile } from "./types";

export const profileData = [
    new Profile(
        0,
        'Jason',
        'https://media.licdn.com/dms/image/C5603AQGwbdEmfv3GLw/profile-displayphoto-shrink_400_400/0/1630555970406?e=1711584000&v=beta&t=TAvvs093bFjDaJSARO49cyv6iM2b4tAlR_10zrnZXlg',
        [
            new Echo(0, 'This is an echo', '2021-01-01', 'img1.jpg'),
            new Echo(1, 'This is an echo', '2021-01-01', 'img1.jpg'),
            new Echo(2, 'This is an echo', '2021-01-01', 'img1.jpg'),
            new Echo(6, 'This is an echo', '2021-01-01', 'img1.jpg'),
            new Echo(4, 'This is an echo', '2021-01-01', 'img1.jpg'),
            new Echo(5, 'This is an echo', '2021-01-01', 'img1.jpg'),
        ],
        [0, -4, 0]
        // [2, 4]
    ),
    new Profile(
        1,
        'Lex',
        'https://media.licdn.com/dms/image/C4E03AQHLCrHhGZ0xMg/profile-displayphoto-shrink_100_100/0/1519486751903?e=1711584000&v=beta&t=-xB0U3PGg1uOgixnYk1Jy33-OQdKs8PEibmjNW9vi4c',
        [
            new Echo(3, 'This is an echo', '2021-01-01', 'img1.jpg'),
            new Echo(0, 'This is an echo', '2021-01-01', 'img1.jpg'),
            new Echo(1, 'This is an echo', '2021-01-01', 'img1.jpg'),
        ],
        [12, 15, 0]
        // [],
    ),
    new Profile(
        2,
        'Albert',
        'https://media.licdn.com/dms/image/D5603AQGF5GrVVQwdVw/profile-displayphoto-shrink_100_100/0/1666664119909?e=1711584000&v=beta&t=iMO6mqslcvmnZ5S4XNAuUIMXpl85o0AUi6CUFR6REbQ',
        [
            new Echo(2, 'This is an echo', '2021-01-01', 'img1.jpg'),
            new Echo(6, 'This is an echo', '2021-01-01', 'img1.jpg')
        ],
        [-20, 5, 0]
        // [4],
    ),
    new Profile(
        3,
        'Allison',
        'https://media.licdn.com/dms/image/C4D03AQFLwa-UHuQ1nQ/profile-displayphoto-shrink_100_100/0/1637243508155?e=1711584000&v=beta&t=0f5hsD080ikaxiwaPB66pE_7TR-rM2Mpc3lp8yWD3TM',
        [
            new Echo(3, 'This is an echo', '2021-01-01', 'img1.jpg'),
            new Echo(0, 'This is an echo', '2021-01-01', 'img1.jpg'),
        ],
        [-4, 27, 0]
        // [4],
    ),
    new Profile(
        4,
        'Helen',
        'https://media.licdn.com/dms/image/D5603AQHXddeEOfmylw/profile-displayphoto-shrink_100_100/0/1691619522175?e=1711584000&v=beta&t=COtLtBHWhc-oHNo9JAoGHqKOZKs1E3BfpoL_bSu_K6I',
        [
            new Echo(1, 'This is an echo', '2021-01-01', 'img1.jpg')
        ],
        [30, 18, 0]
        // [1, 0],
    ),
];