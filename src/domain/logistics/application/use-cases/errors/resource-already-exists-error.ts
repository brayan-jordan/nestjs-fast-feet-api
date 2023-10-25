import { UseCaseError } from '@/core/errors/use-case-error'

export class ResourceAlreadyExistsError extends Error implements UseCaseError {
  constructor(resource: string, identifier: string) {
    super(`${resource} with same ${identifier} already exists.`)
  }
}
