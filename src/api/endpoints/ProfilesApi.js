import { expect } from '@playwright/test';
import { BaseAPI } from '../BaseApi';

export class ProfilesApi extends BaseAPI {
  constructor(request) {
    super(request);
    this._endpoint = '/api/profiles';
    this._headers = { 'content-type': 'application/json' };
  }

  async getProfile(username, token = null) {
    return await this.step(`Get profile for a user`, async () => {
      const headers =
        token !== null
          ? { ...this._headers, authorization: `Token ${token}` }
          : this._headers;

      return await this.request.get(`${this._endpoint}/${username}`, {
        headers,
      });
    });
  }

  async assertUsernameHasCorrectValue(response, username) {
    await this.step(`Assert response body has correct username`, async () => {
      const body = await this.parseBody(response);

      expect(body.profile.username).toBe(username);
    });
  }

  async assertImageHasCorrectValue(response, image) {
    await this.step(
      `Assert response body has correct image value`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.profile.image).toBe(image);
      },
    );
  }

  async assertBioHasCorrectValue(response, bio) {
    await this.step(`Assert response body has correct bio`, async () => {
      const body = await this.parseBody(response);

      expect(body.profile.bio).toBe(bio);
    });
  }

  async assertFollowingHasValueFalse(response) {
    await this.step(
      `Assert response body has 'false' in 'following' field`,
      async () => {
        const body = await this.parseBody(response);

        expect(body.profile.following).toBe(false);
      },
    );
  }
}
