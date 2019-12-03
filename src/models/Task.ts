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
export class Task extends BaseEntity {
	@Field(() => ID)
	@ObjectIdColumn()
	id!: ObjectID;

	@Field()
	@Column()
	description!: string;

	@Field()
	@Column()
	completed!: boolean;

	@Column()
	createdBy!: string;

	@Field()
	@CreateDateColumn({ type: 'timestamp' })
	createdAt!: Date;

	@Field()
	@UpdateDateColumn({ type: 'timestamp', nullable: true })
	updatedAt?: Date;
}
