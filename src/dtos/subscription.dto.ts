import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SubscriptionDto {
  /**
   * Es un tipo de subcripcion para el usuario
   * @example premium
   */
  @IsString()
  @IsNotEmpty()
  type: string;

  /**
   * El precio de la subcripcion
   * @example 200
   */
  @IsNumber()
  @IsNotEmpty()
  amount: number;

   /**
   * Diferencia de precio entre tipo de subscripcion a updatear
   * @example 100
   */
   @IsNumber()
   @IsOptional()
   amountDif?: number;
}
