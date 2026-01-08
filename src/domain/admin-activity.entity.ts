
import { Entity, ManyToOne, JoinColumn, PrimaryColumn, BaseEntity, OneToOne, OneToMany, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AdminUser } from './admin-user.entity';


export enum Module {
    LOBBY = "Lobby",
    SEASON = "Season",
    SEASON_REWARD = "Season Reward",
    DAILY_REWARD = "Daily Reward",
    DAILY_MISSION = "Daily Mission",
    VIP_CARD = "Vip Card",
    VIP_CARD_BENEFIT = "Vip Card Benefit",
    SHOP = "Shop",
    ACHIEVEMENT = "Achievement",
    BADGE = "Badge",
    NOTIFICATION = "Notification",
    GAME = "Game",
    GAMES_SETTING = "Games Setting",
    BUG_REPORT = "Bug Report",
    PERMISSION = "Permission",
    ROLE_PERMISSION = "Role Permission"
}

@Entity({ name: "ADMIN_ACTIVITY" })
export class AdminActivity extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @ManyToOne(() => AdminUser, (admin) => admin.ADMIN_ID, { nullable: false })
    @JoinColumn({ name: 'ADMIN_ID' })
    ADMIN_ID: AdminUser;

    @Column('enum', { enum: Module, nullable: false })
    MODULE: string;

    @Column()
    ACTION: string;
    
    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;
   
}

