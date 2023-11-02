import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'
import { z } from 'zod'
import { Roles } from '@/infra/auth/roles.decorator'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { ChangeRecipientPasswordUseCase } from '@/domain/logistics/application/use-cases/change-recipient-password'

const changeRecipientPasswordBodySchema = z.object({
  password: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(
  changeRecipientPasswordBodySchema,
)

type ChangeRecipientPasswordBodySchema = z.infer<
  typeof changeRecipientPasswordBodySchema
>

@Roles('ADMIN')
@Controller('/recipients/:id/change-password')
export class ChangeRecipientPasswordController {
  constructor(
    private changeRecipientPassword: ChangeRecipientPasswordUseCase,
  ) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: ChangeRecipientPasswordBodySchema,
    @Param('id') recipientId: string,
  ) {
    const { password } = body

    const result = await this.changeRecipientPassword.execute({
      recipientId,
      password,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return result.value
  }
}
