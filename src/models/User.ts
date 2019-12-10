import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

import { Theme } from '~/utils/enum';

import { Task } from './Task';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	username!: string;

	@Column()
	password!: string;

	@Field(() => Theme)
	@Column()
	theme: Theme = Theme.light;

	@OneToMany(
		() => Task,
		task => task.author,
		{ cascade: true }
	)
	tasks!: Task[];

	@Field()
	@CreateDateColumn({ type: 'timestamp' })
	createdAt!: Date;

	@Field()
	@UpdateDateColumn({ type: 'timestamp', nullable: true })
	updatedAt?: Date;
}
