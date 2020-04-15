import {Model, Table, Column, UpdatedAt, PrimaryKey, CreatedAt} from "sequelize-typescript";

@Table
export class User extends Model<User> {
    @PrimaryKey
    @Column
    public email!: string;

    @Column
    public password_hash: string;

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;

    short() {
        return {
          email: this.email
        }
      }
}
