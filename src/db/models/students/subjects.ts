import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../../config";
import Stream from "./stream";

interface SubjectAttributes {
    subjectId: number;
    subjectName: string;
    streamId: number;
    semester: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface SubjectInput extends Optional<SubjectAttributes, "subjectId"> { }
export interface SubjectOutput extends Required<SubjectAttributes> { }

class Subject extends Model<SubjectAttributes, SubjectInput> implements SubjectAttributes {
    public subjectId!: number;
    public subjectName!: string;
    public streamId!: number;
    public semester!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Subject.init(
    {
        subjectId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        subjectName: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        streamId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "streams",
                key: "streamId",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        semester: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "subjects",
        timestamps: true,
        paranoid: true,
    }
);

Stream.hasMany(Subject, { foreignKey: "streamId", as: "subjects" });
Subject.belongsTo(Stream, { foreignKey: "streamId", as: "stream" });

export default Subject;
