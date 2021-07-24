import { publicRequest } from "network/https";
import Navigation from "routes/history";

class AuthService {
  async doLogin(payload) {
    return publicRequest({
      route: "/token/",
      method: "post",
      payload
    });
  }

  Logout(from = "/") {
    const location = {
      pathname: "/sign-in",
      state: { from }
    };
    Navigation.push(location);
    window.location.reload();
  }
}

export default new AuthService();
