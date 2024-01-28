import { ApiService } from "./ApiService";

class FriendService {
    static async addFriend(userId, friendName, friendImage) {
        return await ApiService.post("/add-friend", {
            userId,
            friendName,
            friendImage,
        });
    }
}

export default FriendService