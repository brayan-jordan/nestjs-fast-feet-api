import { Recipient } from '../../enterprise/entities/recipient'

export abstract class RecipientsRepository {
  abstract create(recipient: Recipient): Promise<void>
  abstract findByCpf(cpf: string): Promise<Recipient | null>
}
