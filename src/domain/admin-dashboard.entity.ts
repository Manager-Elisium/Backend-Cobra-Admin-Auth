import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"


@Entity({ name: "ADMIN_DASHBOARD" })
export class AdminDashboard extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column({ default: 0 })
    PLAYER_LOGIN_IN: number;

    @Column({ default: 0 })
    TOTAL_USER: number;

    @Column({ default: 0 })
    AVERAGE_PLAYER_ACTIVE_TIME: number;
    
    @Column({ default: 0 })
    GUEST_PLAYERS_SIGNED_UP: number;

    @Column({ default: 0 })
    PLAYERS_COLLECTED_REWARDS: number;

    @Column({ default: 0 })
    NEW_PLAYERS_SIGNED_UP: number;

    @Column({ default: 0 })
    SEASON_PASS_PURCHASES: number;

    @Column({ default: 0 })
    UNRESOLVED_REPORT: number;

    @Column({ default: 0 })
    RESOLVED_REPORT: number;

    @Column({ default: 0 })
    PLAYERS_PLAYED_2P: number;

    @Column({ default: 0 })
    PLAYERS_PLAYED_3P: number;

    @Column({ default: 0 })
    PLAYERS_PLAYED_4P: number;

    @Column({ default: 0 })
    PLAYERS_SHOP_PURCHASED_GOLD_COINS: number;

    @Column({ default: 0 })
    PLAYERS_SHOP_PURCHASED_DIAMONDS: number;

    @Column({ default: 0 })
    PLAYERS_SHOP_PURCHASED_ITEMS: number;

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;

}