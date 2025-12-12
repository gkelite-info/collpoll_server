import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../../config";
import User from "../user";
import Subject from "./subjects";

interface ResultAttributes {
    resultId: number;
    studentId: number;
    subjectId: number;
    semester: number;
    internalMarks: number;
    externalMarks: number;
    total: number;
    grade: string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ResultInput extends Optional<ResultAttributes, "resultId" | "total"> { }
export interface ResultOutput extends Required<ResultAttributes> { }

class Result extends Model<ResultAttributes, ResultInput> implements ResultAttributes {
    public resultId!: number;
    public studentId!: number;
    public subjectId!: number;
    public semester!: number;
    public internalMarks!: number;
    public externalMarks!: number;
    public total!: number;
    public grade!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Result.init(
    {
        resultId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "userId",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        subjectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "subjects",
                key: "subjectId",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        semester: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        internalMarks: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        externalMarks: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        grade: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "results",
        timestamps: true,
        paranoid: true,
        hooks: {
            beforeCreate: (result: Result) => {
                result.total = result.internalMarks + result.externalMarks;
            },
            beforeUpdate: (result: Result) => {
                result.total = result.internalMarks + result.externalMarks;
            },
        },
    }
);

User.hasMany(Result, { foreignKey: "studentId", as: "results" });
Result.belongsTo(User, { foreignKey: "studentId", as: "student" });

Subject.hasMany(Result, { foreignKey: "subjectId", as: "subject_results" });
Result.belongsTo(Subject, { foreignKey: "subjectId", as: "subject" });

export default Result;
