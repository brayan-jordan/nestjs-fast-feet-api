import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateDeliveryUseCase } from '@/domain/logistics/application/use-cases/create-delivery'
import { Roles } from '@/infra/auth/roles.decorator'

const createDeliveryBodySchema = z.object({
  recipientId: z.string().uuid(),
  courierId: z.string().uuid(),
  latitude: z.number(),
  longitude: z.number(),
  availableToPickupAt: z.date().optional(),
})

type CreateDeliveryBodySchema = z.infer<typeof createDeliveryBodySchema>

@Roles('ADMIN')
@Controller('/deliveries')
export class CreateDeliveryController {
  constructor(private createDelivery: CreateDeliveryUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createDeliveryBodySchema))
  async handle(@Body() body: CreateDeliveryBodySchema) {
    const { courierId, latitude, longitude, recipientId, availableToPickupAt } =
      body

    const result = await this.createDelivery.execute({
      courierId,
      latitude,
      longitude,
      recipientId,
      availableToPickupAt,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
