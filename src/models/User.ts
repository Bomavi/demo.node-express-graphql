import {
	Entity,
	BaseEntity,
	ObjectID,
	ObjectIdColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => ID)
	@ObjectIdColumn()
	id!: ObjectID;

	@Field()
	@Column()
	username!: string;

	@Column()
	password!: string;

	@Field(() => String, { defaultValue: 'light' })
	@Column()
	theme!: Theme;

	@Field()
	@CreateDateColumn({ type: 'timestamp' })
	createdAt!: Date;

	@Field()
	@UpdateDateColumn({ type: 'timestamp', nullable: true })
	updatedAt?: Date;
}
