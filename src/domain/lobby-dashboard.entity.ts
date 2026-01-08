import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"


@Entity({ name: "LOBBY_DASHBOARD" })
export class LobbyDashboard extends BaseEntity {

    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    ID: string;

    @Column({ default: 0 })
    PLAYER_PLAYED: number;

    @Column()
    LOBBY_ID: string;

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    CREATED_DATE: Date;

}