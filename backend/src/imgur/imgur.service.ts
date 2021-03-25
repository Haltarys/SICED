import { Injectable, HttpService, HttpException } from '@nestjs/common';

@Injectable()
export class ImgurService {
  constructor(private readonly httpService: HttpService) {}

  async getImageInfoById(id: string) {
    try {
      const { data } = await this.httpService.get(`/image/${id}`).toPromise();

      return data;
    } catch (err) {
      throw new HttpException(
        `Imgur error: ${err.response.statusText}`,
        err.response.status,
      );
    }
  }
}
