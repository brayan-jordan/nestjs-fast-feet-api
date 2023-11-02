import { Recipient as DomainRecipient } from '@/domain/logistics/enterprise/entities/recipient'

export class RecipientPresenter {
  static toHTTP(recipient: DomainRecipient) {
    return {
      id: recipient.id.toString(),
      name: recipient.name,
      cpf: recipient.cpf,
    }
  }
}
