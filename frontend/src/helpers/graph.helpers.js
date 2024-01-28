import { getCommonEchoes } from './network.helpers';

export const setProfilePositions = (profileData) => {
    // let commonEchoes = getCommonEchoes(profileData)

    // const sortedCommonEchoes = Object.keys(commonEchoes).sort((a, b) => {
    //     return commonEchoes[b].length - commonEchoes[a].length
    // })

    // let profileSet = new Set()
    // for (let i = 0; i < sortedCommonEchoes.length; i++) {
    //     let echoId = sortedCommonEchoes[i]
    //     let profileIds = commonEchoes[echoId]
    //     for (let j = 0; j < profileIds.length; j++) {
    //         let profileId = profileIds[j]
    //         if (!profileSet.has(profileId)) {
    //             profileSet.add(profileId)
    //         }
    //     }
    // }

    // return Array.from(profileSet).map((profileId, i) => {
    //     let profile = profileData.find(profile => profile.id === profileId)
    //     let j = i > 0 ? i + 1 : i
    //     const x = 10 * j * Math.cos(j* 9)
    //     const y = 10 * j * Math.sin(j* 9)
    //     profile.position = [x, y, 0]
    //     return profile
    // })
    return profileData.map((profile, i) => {
        const j = i > 0 ? i + 1 : i
        const x = 10 * j * Math.cos(j * 9)
        const y = 10 * j * Math.sin(j * 9)
        profile.position = [x, y, 0]
        return profile
    })
}