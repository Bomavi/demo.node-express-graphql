import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int, registerEnumType } from 'type-graphql';

export enum Theme {
	light = 'light',
	dark = 'dark',
}

registerEnumType(Theme, {
	name: 'Theme',
	description: 'Only available theme options',
});

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

	@Field()
	@CreateDateColumn({ type: 'timestamp' })
	createdAt!: Date;

	@Field()
	@UpdateDateColumn({ type: 'timestamp', nullable: true })
	updatedAt?: Date;
}
