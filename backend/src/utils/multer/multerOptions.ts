import * as multer from 'multer';
import * as path from 'path';
import { Request } from 'express';
import { BadRequestException } from '@nestjs/common';
import { FOLDER, MAX_SIZE, MIMETYPE } from '../../constants/multer.constants';
import { ResponseMessage } from '../../constants/message/responseMessage.enum';
import { apiResponse } from '../../common/response/apiResponse';

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, path.resolve(FOLDER));
  },
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname + file.mimetype);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (
    file.mimetype === MIMETYPE.JPG ||
    file.mimetype === MIMETYPE.JPEG ||
    file.mimetype === MIMETYPE.PNG
  ) {
    cb(null, true);
  } else {
    cb(
      new BadRequestException(
        apiResponse.send(null, {
          image: ResponseMessage.IMG_ERROR,
        }),
      ),
    );
  }
};

export const multerOptions = {
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: MAX_SIZE },
};
