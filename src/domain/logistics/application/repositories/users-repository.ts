import { Courier } from '../../enterprise/entities/courier'
import { Recipient } from '../../enterprise/entities/recipient'

export abstract class UsersRepository {
  abstract findByCpf(cpf: string): Promise<Courier | Recipient | null>
}
