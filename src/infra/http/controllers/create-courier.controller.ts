import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateCourierUseCase } from '@/domain/logistics/application/use-cases/create-courier'
import { ResourceAlreadyExistsError } from '@/domain/logistics/application/use-cases/errors/resource-already-exists-error'
import { Roles } from '@/infra/auth/roles.decorator'

const createCourierBodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
  password: z.string().min(6),
})

type CreateCourierBodySchema = z.infer<typeof createCourierBodySchema>

@Roles('ADMIN')
@Controller('/couriers')
export class CreateCourierController {
  constructor(private createCourier: CreateCourierUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCourierBodySchema))
  async handle(@Body() body: CreateCourierBodySchema) {
    const { cpf, password, name } = body

    const result = await this.createCourier.execute({
      cpf,
      password,
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
