import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../config";


interface UserAttributes {
    userId: number;
    name: string;
    fatherName: string;
    motherName?: string;
    guardianName?: string;
    role: string;
    email: string;
    password?: string;
    mobile: string;
    fatherMobile: string;
    motherMobile?: string;
    guardianMobile?: string;
    address: string;
    college: string;
    stream?: string;
    is_deleted?: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface userInput extends Optional<UserAttributes, "userId" | "password"> { }
export interface userOutput extends Required<UserAttributes> { }

class User extends Model<UserAttributes, userInput> implements UserAttributes {
    public userId!: number;
    public name!: string;
    public fatherName!: string;
    public motherName!: string;
    public guardianName!: string;
    public role!: string;
    public email!: string;
    public password?: string;
    public mobile!: string;
    public fatherMobile!: string;
    public motherMobile!: string;
    public guardianMobile!: string;
    public address!: string;
    public college!: string;
    public stream!: string;
    public is_deleted!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User.init({
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    fatherName: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    motherName: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    guardianName: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mobile: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    fatherMobile: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    motherMobile: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    guardianMobile: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    college: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    stream: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }

}, {
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
    tableName: "users"
});

export default User;