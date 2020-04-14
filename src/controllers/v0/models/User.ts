import {Model, Table, Column, UpdatedAt, PrimaryKey, CreatedAt} from "sequelize-typescript";

@Table
export class User extends Model<User> {
    @PrimaryKey
    @Column
    public email!: string;

    @Column
    password_hash: string;

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updateDate: Date;

    short() {
        return {
          email: this.email
        }
      }
}
