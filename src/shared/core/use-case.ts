import { z } from 'zod';

export interface UseCaseConfig {
  schema?: {
    description?: string;
    tags?: string[];
    body?: z.ZodType<any>;
    response?: {
      [statusCode: number]: z.ZodType<any>;
    };
  };
}

export abstract class UseCase<TInput = void, TOutput = void> {
  abstract execute(input: TInput): Promise<TOutput>;

  static config(): UseCaseConfig {
    return {};
  }
}
