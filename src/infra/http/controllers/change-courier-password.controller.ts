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
import { ChangeCourierPasswordUseCase } from '@/domain/logistics/application/use-cases/change-courier-password'

const changeCourierPasswordBodySchema = z.object({
  password: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(
  changeCourierPasswordBodySchema,
)

type ChangeCourierPasswordBodySchema = z.infer<
  typeof changeCourierPasswordBodySchema
>

@Roles('ADMIN')
@Controller('/couriers/:id/change-password')
export class ChangeCourierPasswordController {
  constructor(private changeCourierPassword: ChangeCourierPasswordUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: ChangeCourierPasswordBodySchema,
    @Param('id') courierId: string,
  ) {
    const { password } = body

    const result = await this.changeCourierPassword.execute({
      courierId,
      password,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return result.value
  }
}
