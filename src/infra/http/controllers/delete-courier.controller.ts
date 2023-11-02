import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { Roles } from '@/infra/auth/roles.decorator'
import { DeleteCourierUseCase } from '@/domain/logistics/application/use-cases/delete-courier'

@Roles('ADMIN')
@Controller('/couriers/:id')
export class DeleteCourierController {
  constructor(private deleteCourier: DeleteCourierUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') courierId: string) {
    const result = await this.deleteCourier.execute({
      courierId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
