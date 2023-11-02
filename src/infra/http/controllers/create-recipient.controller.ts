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
import { CreateRecipientUseCase } from '@/domain/logistics/application/use-cases/create-recipient'
import { ResourceAlreadyExistsError } from '@/domain/logistics/application/use-cases/errors/resource-already-exists-error'
import { Roles } from '@/infra/auth/roles.decorator'

const createRecipientBodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
  password: z.string().min(6),
})

type CreateRecipientBodySchema = z.infer<typeof createRecipientBodySchema>

@Roles('ADMIN')
@Controller('/recipients')
export class CreateRecipientController {
  constructor(private createRecipient: CreateRecipientUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createRecipientBodySchema))
  async handle(@Body() body: CreateRecipientBodySchema) {
    const { cpf, password, name } = body

    const result = await this.createRecipient.execute({
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
