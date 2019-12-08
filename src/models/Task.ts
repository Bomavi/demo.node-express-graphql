import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
@Entity('tasks')
export class Task extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	description!: string;

	@Field()
	@Column()
	completed!: boolean;

	@Column()
	createdBy!: number;

	@Field()
	@CreateDateColumn({ type: 'timestamp' })
	createdAt!: Date;

	@Field()
	@UpdateDateColumn({ type: 'timestamp', nullable: true })
	updatedAt?: Date;
}
