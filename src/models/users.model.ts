import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: 'user'  
})
export class User extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID
    })
    uid!: string;

    @Column({
        type: DataType.STRING
    })
    name!: string

    @Column({
        type: DataType.STRING
    })
    surname!: string

    @Column({
        type: DataType.STRING
    })
    email!: string

    @Column({
        type: DataType.STRING
    })
    password!: string


}