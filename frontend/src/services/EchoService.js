import { ApiService } from './ApiService';

class EchoService {
    static async getEcho(echoId) {
        return await ApiService.post('/get-echo', {
            echoId
        });
    }

    static async getUserEchoes(userId) {
        return await ApiService.post('/get-user-echoes', {
            userId
        });
    }

    static async addEcho(userId, echo) {
        return await ApiService.post('/add-echo', {
            userId,
            caption: echo.text,
            image: echo.imageSrc,
            date: echo.date,
            location: echo.location,
        });
    }

    // static async shareEcho(userId, echoId, friendId) {
    //     return await ApiService.post('/share-echo', {
    //         userId,
    //         echoId,
    //         friendId,
    //     });
    // }
}

export default EchoService;