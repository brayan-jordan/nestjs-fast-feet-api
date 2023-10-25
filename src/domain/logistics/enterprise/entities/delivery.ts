import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface DeliveryProps {
  recipientId: UniqueEntityID
  courierId: UniqueEntityID
  availableToPickupAt?: Date | null
  collectedAt?: Date | null
  deliveredAt?: Date | null
  returnedAt?: Date | null
}

export class Delivery extends Entity<DeliveryProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get courierId() {
    return this.props.courierId
  }

  get availableToPickupAt() {
    return this.props.availableToPickupAt
  }

  get collectedAt() {
    return this.props.collectedAt
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  get returnedAt() {
    return this.props.returnedAt
  }

  static create(props: DeliveryProps, id?: UniqueEntityID) {
    const delivery = new Delivery(props, id)

    return delivery
  }
}
