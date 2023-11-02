import { InMemoryCouriersRepository } from 'test/repositories/in-memory-couriers-repository'
import { makeCourier } from 'test/factories/make-courier'
import { FetchCouriersUseCase } from './fetch-couriers'

let inMemoryCouriersRepository: InMemoryCouriersRepository
let sut: FetchCouriersUseCase

describe('Fetch couriers', () => {
  beforeEach(() => {
    inMemoryCouriersRepository = new InMemoryCouriersRepository()
    sut = new FetchCouriersUseCase(inMemoryCouriersRepository)
  })

  it('should be able to fetch couriers', async () => {
    const courier1 = makeCourier()
    const courier2 = makeCourier()

    inMemoryCouriersRepository.items.push(courier1)
    inMemoryCouriersRepository.items.push(courier2)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value.couriers).toHaveLength(2)
  })
})
