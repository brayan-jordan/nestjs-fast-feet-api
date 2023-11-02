import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { Roles } from '@/infra/auth/roles.decorator'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { EditDeliveryUseCase } from '@/domain/logistics/application/use-cases/edit-delivery'

const editDeliveryBodySchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
})

const bodyValidationPipe = new ZodValidationPipe(editDeliveryBodySchema)

type EditDeliveryBodySchema = z.infer<typeof editDeliveryBodySchema>

@Roles('ADMIN')
@Controller('/deliveries/:id')
export class EditDeliveryController {
  constructor(private editDelivery: EditDeliveryUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditDeliveryBodySchema,
    @Param('id') deliveryId: string,
  ) {
    const { latitude, longitude } = body

    const result = await this.editDelivery.execute({
      deliveryId,
      latitude,
      longitude,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
