import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { EditCourierUseCase } from '@/domain/logistics/application/use-cases/edit-courier'
import { ResourceAlreadyExistsError } from '@/domain/logistics/application/use-cases/errors/resource-already-exists-error'
import { Roles } from '@/infra/auth/roles.decorator'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const editCourierBodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editCourierBodySchema)

type EditCourierBodySchema = z.infer<typeof editCourierBodySchema>

@Roles('ADMIN')
@Controller('/couriers/:id')
export class EditCourierController {
  constructor(private editCourier: EditCourierUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditCourierBodySchema,
    @Param('id') courierId: string,
  ) {
    const { cpf, name } = body

    const result = await this.editCourier.execute({
      courierId,
      cpf,
      name,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException()
      }
    }
  }
}
