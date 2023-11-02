import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { Roles } from '@/infra/auth/roles.decorator'
import { DeleteDeliveryUseCase } from '@/domain/logistics/application/use-cases/delete-delivery'

@Roles('ADMIN')
@Controller('/deliveries/:id')
export class DeleteDeliveryController {
  constructor(private deleteDelivery: DeleteDeliveryUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') deliveryId: string) {
    const result = await this.deleteDelivery.execute({
      deliveryId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
