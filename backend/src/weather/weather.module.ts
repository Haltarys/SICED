import { HttpModule, Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WEATHER_API_KEY } from 'src/config/config';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://api.openweathermap.org/data/2.5/',
      params: {
        appid: WEATHER_API_KEY,
      },
    }),
  ],
  controllers: [WeatherController],
})
export class WeatherModule {}
