import { ApiService } from './ApiService';

class UserService {
    static async createUser(email, name, image) {
        return await ApiService.post('/create-user', {
            email,
            name,
            image
        });
    }

    static async getUser(userId) {
        return await ApiService.post('/get-user', {
            userId
        });
    }

    static async getUserId(email) {
        return await ApiService.post('/get-user-id', {
            email
        });
    }
}

export default UserService;