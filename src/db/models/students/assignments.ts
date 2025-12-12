import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../../config";
import Subject from "./subjects";

interface AssignmentAttributes {
    assignmentId: number;
    subjectId: number;
    title: string;
    description?: string;
    assignedDate: Date;
    dueDate: Date;
    fileUrl?: string;
    semester: number;
    year: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface AssignmentInput extends Optional<AssignmentAttributes, "assignmentId" | "description" | "fileUrl"> { }
export interface AssignmentOutput extends Required<AssignmentAttributes> { }

class Assignment extends Model<AssignmentAttributes, AssignmentInput> implements AssignmentAttributes {
    public assignmentId!: number;
    public subjectId!: number;
    public title!: string;
    public description!: string;
    public assignedDate!: Date;
    public dueDate!: Date;
    public fileUrl!: string;
    public semester!: number;
    public year!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Assignment.init(
    {
        assignmentId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        subjectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "subjects",
                key: "subjectId",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        assignedDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        dueDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        fileUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        semester: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "assignments",
        timestamps: true,
        paranoid: true,
    }
);

Subject.hasMany(Assignment, { foreignKey: "subjectId", as: "assignments" });
Assignment.belongsTo(Subject, { foreignKey: "subjectId", as: "subjects" });

export default Assignment;
