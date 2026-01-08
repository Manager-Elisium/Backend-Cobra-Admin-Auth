import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable,  } from "typeorm"


@Entity({ name: "PERMISSION" })
export class Permission extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column()
    NAME: string;

    @Column()
    SLUG: string;

    @Column({ nullable: true })
    DESC: string;

    @Column({ default: true })
    IS_ACTIVE: boolean;

    @Column('timestamp with time zone', { nullable: true })
    UPDATED_DATE?: Date

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;

}