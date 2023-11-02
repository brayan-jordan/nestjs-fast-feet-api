import { Courier as DomainCourier } from '@/domain/logistics/enterprise/entities/courier'

export class CourierPresenter {
  static toHTTP(courier: DomainCourier) {
    return {
      id: courier.id.toString(),
      name: courier.name,
      cpf: courier.cpf,
    }
  }
}
