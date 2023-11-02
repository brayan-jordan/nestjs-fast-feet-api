import { Courier } from '../../enterprise/entities/courier'

export abstract class CouriersRepository {
  abstract create(courier: Courier): Promise<void>
  abstract findByCpf(cpf: string): Promise<Courier | null>
  abstract findById(id: string): Promise<Courier | null>
  abstract delete(courier: Courier): Promise<void>
  abstract save(courier: Courier): Promise<void>
  abstract findMany(): Promise<Courier[]>
}
