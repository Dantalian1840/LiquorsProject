import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subscription } from './Subscription.entity';
import { Reviews } from './Review.entity';
import { Product } from './Product.entity';
import { UserRole } from 'src/enums/roles.enum';

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
    nullable: false,
  })
  role: UserRole;

  @Column({
    type: 'text',
    default:
      'https://firebasestorage.googleapis.com/v0/b/liquors-12b23.appspot.com/o/files%2FWindows_10_Default_Profile_Picture.svg.png?alt=media&token=836d210f-f0e8-4cef-8869-c0603ea315c1',
  })
  profileImage: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  firebaseUid: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  newsletter: boolean;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  provider: string;

  @JoinColumn({ name: 'subscriptionId' })
  @OneToOne(() => Subscription, (subscription) => subscription.user)
  subscription: Subscription;

  @JoinColumn({ name: 'review_id' })
  @OneToMany(() => Reviews, (review) => review.userId)
  reviews: Reviews[];

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'favorites_products',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  favorites: Product[];

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'box_products',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  box: Product[];

  @OneToMany(() => Product, (prod) => prod.seller)
  products_id: Product[];
}
