import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { Request } from 'express';
import { UserGuard } from '../auth/guard/auth.guard';
import { apiResponse } from '../common/response/apiResponse';
import { ResponseMessage } from '../constants/message/responseMessage.enum';

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

  @Put('/resetdislike')
  async resetDislikeList(@Req() req: Request) {
    await this.matchService.resetDislikeList(req.currentUser.id);
    return apiResponse.send(null, null);
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

  /**
   * @description GET method to get users for matching
   * @param req Http Request
   * @returns response form with array of user
   */
  @Get('/:limit&:skip')
  async getListUsers(
    @Req() req: Request,
    @Param('limit') limit: number,
    @Param('skip') skip: number,
  ) {
    if (isNaN(limit)) {
      throw new BadRequestException(
        apiResponse.send(null, { common: ResponseMessage.INVALID_LIMIT }),
      );
    }
    if (limit <= 0) limit = 1;

    if (isNaN(skip) || skip < 0) {
      throw new BadRequestException(
        apiResponse.send(null, { common: ResponseMessage.INVALID_SKIP }),
      );
    }
    const users = await this.matchService.getUsers(
      req.currentUser.id,
      limit,
      skip,
    );
    return apiResponse.send(users, null);
  }
}
