import {AuthService} from "./service.js";

export class AuthController {
  constructor() {
    this.authService = new AuthService();
    this.getToken = this.getToken.bind(this);
  }
  async getToken(request, response, next) {
    try {
      const data  = await this.authService.getToken('client_credentials', 'coding_test', process.env.CLIENT_SECRET);
      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

