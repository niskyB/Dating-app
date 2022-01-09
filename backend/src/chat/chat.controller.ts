import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserGuard } from '../auth/guard/auth.guard';
import { ChatService } from './chat.service';
import { Request } from 'express';
import { apiResponse } from '../common/response/apiResponse';

@Controller('chat')
@UseGuards(UserGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/chatList')
  async getChatList(@Req() req: Request) {
    const result = await this.chatService.getChatList(req.currentUser.id);
    return apiResponse.send(result, null);
  }
}
