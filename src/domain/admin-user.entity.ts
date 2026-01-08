import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm"
import { Role } from "./role.entity";
import { AdminActivity } from "./admin-activity.entity";


@Entity({ name: "ADMIN_USER" })
export class AdminUser extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column()
    EMAIL: string;

    @Column()
    PASSWORD: string;

    @Column({ default: false })
    IS_ACTIVE: boolean;

    @Column({ nullable: true })
    AUTH_TOKEN: string;

    @ManyToOne(() => Role, (role) => role.USERS, { nullable: false })
    ROLE_ID: Role;

    @OneToMany(() => AdminActivity, (adminActivity) => adminActivity.ADMIN_ID)
    ADMIN_ID: AdminActivity[];

    @Column('timestamp with time zone', { nullable: true })
    UPDATED_DATE?: Date

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;

}