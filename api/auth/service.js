import axios from 'axios';

export class AuthService {
  async getToken(grantType, clientId, clientSecret) {
    const { data } = await axios({
      url: `${process.env.WOW_AUTH}`,
      method: 'POST',
      data: {
        grant_type: grantType,
        client_id: clientId,
        client_secret: clientSecret
      }
    });
    return data;
  }
}
