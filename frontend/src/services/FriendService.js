import { ApiService } from "./ApiService";

class FriendService {
    static async addFriend(userId, friendId, friendImage) {
        return await ApiService.post("/add-friend", {
            userId,
            friendId,
            friendImage,
        });
    }
}

export default FriendService