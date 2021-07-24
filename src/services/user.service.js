import { publicRequest } from "network/https";

class UserService {
  async getTest() {
    return publicRequest({ route: "/users" });
  }
}

export default new UserService();
