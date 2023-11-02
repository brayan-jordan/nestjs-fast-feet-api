import { InvalidAttachmentTypeError } from '@/domain/logistics/application/use-cases/errors/invalid-attachment-type-error'
import { UploadAndCreateAttachmentUseCase } from '@/domain/logistics/application/use-cases/upload-and-create-attachment'
import { Roles } from '@/infra/auth/roles.decorator'
import {
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  FileTypeValidator,
  BadRequestException,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('/attachments')
@Roles('COURIER')
export class UploadAttachmentController {
  constructor(
    private uploadAndCreateAttachment: UploadAndCreateAttachmentUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 2, // 2mb
          }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg|pdf)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.uploadAndCreateAttachment.execute({
      body: file.buffer,
      fileName: file.originalname,
      fileType: file.mimetype,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case InvalidAttachmentTypeError:
          throw new BadRequestException(error.message)
        default:
          throw new BadRequestException()
      }
    }

    const { attachment } = result.value

    return {
      attachmentId: attachment.id.toString(),
    }
  }
}
