import { Either, left, rigth } from '@/core/either'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { UsersRepository } from '../repositories/users-repository'

interface AuthenticateUseCaseRequest {
  cpf: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByCpf(cpf)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      throw new WrongCredentialsError()
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
      role: user.role,
    })

    return rigth({ accessToken })
  }
}
