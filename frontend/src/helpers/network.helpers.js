
/**
 * Helper function that returns profileData with the connectedTo array populated
 * @param {Profile[]} profileData 
 * @returns Profile[]
 */
export const calculateConnections = (profileData) => {
    // populate the connectedTo array for each profile if two profiles share an echo with the same id
    profileData.forEach((profile) => {
        profileData.forEach((otherProfile) => {
            if (profile.id !== otherProfile.id) {
                profile.echoes.forEach((echo) => {
                    otherProfile.echoes.forEach((otherEcho) => {
                        if (echo.id === otherEcho.id && !otherProfile.connectedTo.includes(profile.id)) {
                            profile.connectedTo.push(otherProfile.id);
                        }
                    });
                });
            }
        });
    });
    return profileData;
}

/**
 * Helper function that returns a dictionary of echo ids that are shared by more than one profile.
 * The key is the echo id and the value is an array of profile ids that share the echo.
 * @param {Profile[]} profileData 
 * @returns Map<echoId, profileId[]>
 */
export const getCommonEchoes = (profileData) => {
    let countDict = {}
    let nodeDict = {}
    let res = {}

    for (let profile of profileData) {
        let echoes = profile.echoes
        echoes.forEach((echo) => {
            // count occurrences of each echo
            countDict[echo.id] = countDict[echo.id] ? countDict[echo.id] + 1 : 1
            // store profile id for each integer
            if (!nodeDict[echo.id]) {
                nodeDict[echo.id] = []
            }
            nodeDict[echo.id].push(profile.id)
        })
    }

    for (let echoId in countDict) {
        if (countDict[echoId] > 1) {
            res[echoId] = nodeDict[echoId]
        }
    }

    return res
}

/**
 * Helper function that converts the output from the above algorithm into a dictionary of profile combinations that share echoes.
 * @param {Map<int, int[]} commonEchoes 
 * @returns 
 */
export const groupCommonEchoesByProfileCombination = (commonEchoes) => {
    let res = {}
    for (let echoId in commonEchoes) {
        let profileIds = commonEchoes[echoId]
        if (!res[profileIds]) {
            res[profileIds] = []
        }
        res[profileIds].push(Number(echoId))
    }
    return res
}

/**
 * Get all echoes from profileData
 * @param {Profile[]} profileData 
 * @returns 
 */
export const getAllEchoes = profileData =>
    profileData.map(profile => profile.echoes).flat();


/**
 * Return the 3D coordinates of the center of gravity of the n provided profiles
 * @param {*} profiles 
 */
export const calculateCenter = (profiles) => {
    let x = 0;
    let y = 0;
    let z = 0;
    for (let profile of profiles) {
        x += profile.position[0];
        y += profile.position[1];
        z += profile.position[2];
    }
    return [x / profiles.length, y / profiles.length, z / profiles.length];
}