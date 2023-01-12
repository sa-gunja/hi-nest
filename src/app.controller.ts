import { Controller, Get } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(public AppService: AppService) {}

  @Get()
  home(): string {
    return this.AppService.home();
  }
}
