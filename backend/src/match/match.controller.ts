import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { Request } from 'express';
import { UserGuard } from '../auth/guard/auth.guard';
import { apiResponse } from '../common/response/apiResponse';

@Controller('match')
@UseGuards(UserGuard)
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  /**
   * @description GET method to get match list
   * @param req  Http request
   * @returns  response form with array of user
   */
  @Get('/matchedList')
  async getMatchList(@Req() req: Request) {
    const users = await this.matchService.getMatchList(req.currentUser.id);
    return apiResponse.send(users, null);
  }

  /**
   * @description GET method to get users for matching
   * @param req Http Request
   * @returns response form with array of user
   */
  @Get('/:index/:limit')
  async getListUsers(
    @Req() req: Request,
    @Param('index') index: number,
    @Param('limit') limit: number,
  ) {
    const users = await this.matchService.getUsers(
      req.currentUser.id,
      index,
      limit,
    );
    return apiResponse.send(users, null);
  }

  /**
   * @description POST method to like a user
   * @param req Http request
   * @param id id of liked user
   * @returns response form with no data and error
   */
  @Post('/likeList/:id')
  async testMatch(@Req() req: Request, @Param('id') id: string) {
    await this.matchService.match(req.currentUser.id, id);
    return apiResponse.send(null, null);
  }

  @Post('/dislikeList/:id')
  async dislikeUser(@Req() req: Request, @Param('id') id: string) {
    const res = await this.matchService.dislike(req.currentUser.id, id);
    return apiResponse.send(res, null);
  }
}
