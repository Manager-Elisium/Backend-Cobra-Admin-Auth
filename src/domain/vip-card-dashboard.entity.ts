import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"


@Entity({ name: "VIP_CARD_DASHBOARD" })
export class VipCardDashboard extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column({ default: 0 })
    PLAYER_BOUGHT: number;

    @Column()
    VIP_CARD_ID: string;

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;

}