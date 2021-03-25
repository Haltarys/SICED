import {
  Controller,
  Get,
  HttpException,
  HttpService,
  Param,
} from '@nestjs/common';

@Controller('weather')
export class WeatherController {
  constructor(private readonly httpService: HttpService) {}

  @Get(':city')
  async getCurrentWeather(@Param('city') city: string) {
    try {
      const { data } = await this.httpService
        .get('/weather', {
          params: { q: city },
        })
        .toPromise();

      return data;
    } catch (err) {
      throw new HttpException(
        `OpenWeatherMap error: ${err.response.statusText}`,
        err.response.status,
      );
    }
  }
}
