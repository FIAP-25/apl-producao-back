/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Base')
@Controller()
export class BaseController {
    @Get()
    @Redirect('/api')
    redirectToSwagger(): void {}
}
