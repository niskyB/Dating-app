import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { Request } from 'express';
import { UserGuard } from '../auth/guard/auth.guard';
import { apiResponse } from 'src/common/interface/apiResponse';

@Controller('match')
@UseGuards(UserGuard)
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  /**
   * @description GET method to get match list
   * @param req Http Request
   * @returns array of users
   */
  @Get('')
  async getListUsers(@Req() req: Request) {
    const users = await this.matchService.getUsers(req.currentUser.id);
    return apiResponse.send(users, null);
  }

  /**
   * @description test method to match a user
   * @param req
   * @param id
   */
  @Post('/:id')
  async testMatch(@Req() req: Request, @Param('id') id: string) {
    await this.matchService.match(req.currentUser.id, id);
  }
}
