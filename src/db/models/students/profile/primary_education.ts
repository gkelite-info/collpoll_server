import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../../../config";
import StudentProfile from "../student_profiles";

interface PrimaryEducationAttributes {
    primaryEducationId: number;
    studentId: number;
    schoolName: string;
    board: string;
    mediumOfStudy: string;
    yearOfPassing: number;
    location: string;
    is_deleted?: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface PrimaryEducationInput extends Optional<PrimaryEducationAttributes, "primaryEducationId" | "is_deleted"> { }
export interface PrimaryEducationOutput extends Required<PrimaryEducationAttributes> { }

class PrimaryEducation extends Model<PrimaryEducationAttributes, PrimaryEducationInput> implements PrimaryEducationAttributes {
    public primaryEducationId!: number;
    public studentId!: number;
    public schoolName!: string;
    public board!: string;
    public mediumOfStudy!: string;
    public yearOfPassing!: number;
    public location!: string;
    public is_deleted?: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

PrimaryEducation.init(
    {
        primaryEducationId: {
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

        schoolName: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        board: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        mediumOfStudy: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        yearOfPassing: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        location: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    
    {
        sequelize: sequelizeConnection,
        tableName: "primary_education",
        timestamps: true,
        paranoid: true,
    }
);

StudentProfile.hasOne(PrimaryEducation, {
    foreignKey: "studentId",
    as: "primary_education",
});

PrimaryEducation.belongsTo(StudentProfile, {
    foreignKey: "studentId",
    as: "student_profile",
});

export default PrimaryEducation;