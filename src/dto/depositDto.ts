import { Min, Max } from 'class-validator';

export class depositDto {
  @Min(1)
  @Max(1000)
  amount: number;
}

export class withdrawDto {
  @Min(1)
  @Max(200)
  amount: number;
}
