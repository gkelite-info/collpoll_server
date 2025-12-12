import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface CollegeAttributes {
    collegeId: number;
    collegeName: string;
    address: string;
    contact: string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface CollegeInput extends Optional<CollegeAttributes, "collegeId"> { }
export interface CollegeOutput extends Required<CollegeAttributes> { }

class College extends Model<CollegeAttributes, CollegeInput> implements CollegeAttributes {
    public collegeId!: number;
    public collegeName!: string;
    public address!: string;
    public contact!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

College.init(
    {
        collegeId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        collegeName: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        contact: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "colleges",
        timestamps: true,
        paranoid: true,
    }
);

export default College;
