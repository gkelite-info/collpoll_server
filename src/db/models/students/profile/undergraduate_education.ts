import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../../../config";
import StudentProfile from "../student_profiles";

interface UndergraduateAttributes {
    undergraduateEducationId: number;
    studentId: number;
    courseName: string;
    specialization: string;
    collegeName: string;
    CGPA: number;
    startYear: number;
    endYear: number;
    courseType: string;
    is_deleted?: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface UndergraduateEducationInput extends Optional<UndergraduateAttributes, "undergraduateEducationId" | "is_deleted"> { }
export interface UndergraduateEducationOutput extends Required<UndergraduateAttributes> { }

class UndergraduateEducation extends Model<UndergraduateAttributes, UndergraduateEducationInput> implements UndergraduateAttributes {
    public undergraduateEducationId!: number;
    public studentId!: number;
    public courseName!: string;
    public specialization!: string;
    public collegeName!: string;
    public CGPA!: number;
    public startYear!: number;
    public endYear!: number;
    public courseType!: string;
    public is_deleted?: boolean;

    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;
}

UndergraduateEducation.init(
    {
        undergraduateEducationId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        studentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "student_profile",
                key: "studentId",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

        courseName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        specialization: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        collegeName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        CGPA: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },

        startYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        endYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        courseType: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },

    {
        sequelize: sequelizeConnection,
        tableName: "undergraduate_education",
        timestamps: true,
        paranoid: true,
    } 
);

StudentProfile.hasOne(UndergraduateEducation, {
    foreignKey: "studentId",
    as: "undergraduate_educcation",
});

UndergraduateEducation.belongsTo(StudentProfile, {
    foreignKey: "studentId",
    as: "student_profile",
});

export default UndergraduateEducation;