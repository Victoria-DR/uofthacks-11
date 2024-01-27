
/**
 * Helper function that returns profileData with the connectedTo array populated
 * @param {*} profileData Profile[]
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
 * @param {*} profileData Profile[]
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