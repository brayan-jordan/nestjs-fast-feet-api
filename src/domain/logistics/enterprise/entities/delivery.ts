import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface DeliveryProps {
  recipientId: UniqueEntityID
  courierId: UniqueEntityID
  latitude: number
  longitude: number
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

  get latitude() {
    return this.props.latitude
  }

  get longitude() {
    return this.props.longitude
  }

  set latitude(latitude: number) {
    this.props.latitude = latitude
  }

  set longitude(longitude: number) {
    this.props.longitude = longitude
  }

  set availableToPickupAt(availableToPickupAt: Date) {
    this.props.availableToPickupAt = availableToPickupAt
  }

  set collectedAt(collectedAt: Date) {
    this.props.collectedAt = collectedAt
  }

  set deliveredAt(deliveredAt: Date) {
    this.props.deliveredAt = deliveredAt
  }

  set returnedAt(returnedAt: Date) {
    this.props.returnedAt = returnedAt
  }

  static create(props: DeliveryProps, id?: UniqueEntityID) {
    const delivery = new Delivery(props, id)

    return delivery
  }
}
