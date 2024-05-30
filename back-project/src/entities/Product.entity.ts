import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reviews } from './review.entity';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  //! Revisar
  // @Column({
  //   type: 'decimal'
  // })
  // price: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  category: string;

  @JoinColumn({ name: 'review_id' })
  @OneToMany(() => Reviews, (reviews) => reviews.productId)
  reviewId: Reviews[];
}