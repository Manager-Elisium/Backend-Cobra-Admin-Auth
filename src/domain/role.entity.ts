import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { AdminUser } from "./admin-user.entity";


@Entity({ name: "ROLE" })
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column()
    NAME: string;

    @Column({ default: true })
    IS_ACTIVE: boolean;

    @OneToMany(() => AdminUser, (adminUser) => adminUser.ROLE_ID)
    USERS: AdminUser[];

    @Column('timestamp with time zone', { nullable: true })
    UPDATED_DATE?: Date

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;

}