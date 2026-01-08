
import { Entity, ManyToOne, JoinColumn, PrimaryColumn, BaseEntity } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Entity({ name: "ROLE_PERMISSION" })
export class RolesPermission extends BaseEntity {

    @PrimaryColumn({ type: 'uuid' })
    @ManyToOne(() => Role, role => role.ID)
    @JoinColumn({ name: 'ROLE_ID' })
    ROLE_ID: Role;

    @PrimaryColumn({ type: 'uuid' })
    @ManyToOne(() => Permission, permission => permission.ID)
    @JoinColumn({ name: 'PERMISSION_ID' })
    PERMISSION_ID: Permission;
}
