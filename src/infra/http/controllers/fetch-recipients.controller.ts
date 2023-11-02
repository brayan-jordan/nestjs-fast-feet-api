import { BadRequestException, Controller, Get } from '@nestjs/common'
import { Roles } from '@/infra/auth/roles.decorator'
import { FetchRecipientsUseCase } from '@/domain/logistics/application/use-cases/fetch-recipients'
import { RecipientPresenter } from '../presenters/recipient-presenter'

@Roles('ADMIN')
@Controller('/recipients')
export class FetchRecipientsController {
  constructor(private fetchRecipients: FetchRecipientsUseCase) {}

  @Get()
  async handle() {
    const result = await this.fetchRecipients.execute()

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { recipients } = result.value

    return { recipients: recipients.map(RecipientPresenter.toHTTP) }
  }
}
