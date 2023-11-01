import { AdminsRepository } from '@/domain/logistics/application/repositories/admins-repository'
import { Admin } from '@/domain/logistics/enterprise/entities/admin'

export class InMemoryAdminsRepository implements AdminsRepository {
  public items: Admin[] = []
}
