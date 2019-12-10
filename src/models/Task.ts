import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

import { User } from './User';

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

	@ManyToOne(
		() => User,
		user => user.tasks
	)
	author!: number;

	@Field()
	@CreateDateColumn({ type: 'timestamp' })
	createdAt!: Date;

	@Field()
	@UpdateDateColumn({ type: 'timestamp', nullable: true })
	updatedAt?: Date;
}
