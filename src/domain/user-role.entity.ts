
import { Entity, PrimaryColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { AdminUser } from './admin-user.entity';
import { Role } from './role.entity';


@Entity({ name: "USER_ROLE" })
export class UsersRoles extends BaseEntity {


    @PrimaryColumn({ type: 'uuid' })
    @ManyToOne(() => AdminUser, user => user.ID)
    @JoinColumn({ name: 'USER_ID' })
    USER_ID: AdminUser;

    @PrimaryColumn({ type: 'uuid' })
    @ManyToOne(() => Role, role => role.ID)
    @JoinColumn({ name: 'ROLE_ID' })
    ROLE_ID: Role;


}
