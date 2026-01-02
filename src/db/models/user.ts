import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface UserAttributes {
    userId: number;
    fullName: string;
    email: string;
    mobile: string;
<<<<<<< Updated upstream
    linkedIn: string;
=======
    linkedIn?: string;
>>>>>>> Stashed changes
    collegeId?: number | null;
    role?: string;
    is_deleted?: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, "userId" | "is_deleted"> { }
export interface UserOutput extends Required<UserAttributes> { }

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public userId!: number;
    public fullName!: string;
    public email!: string;
    public mobile!: string;
<<<<<<< Updated upstream
    public linkedIn!: string;
=======
    public linkedIn?: string;
>>>>>>> Stashed changes
    public collegeId?: number | null;
    public role?: string;
    public is_deleted!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

<<<<<<< Updated upstream
User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
            validate: { isEmail: true },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mobile: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        linkedIn: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true
        },
        collegeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "colleges",
                key: "collegeId",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },
        role: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
=======
User.init({
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
>>>>>>> Stashed changes
    },
    fullName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    mobile: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    linkedIn: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true
    },
    collegeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "colleges",
            key: "collegeId",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
},
    {
        timestamps: true,
        paranoid: true,
        sequelize: sequelizeConnection,
        tableName: "users",
    }
);

export default User;