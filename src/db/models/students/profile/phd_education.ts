import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../../../config";
import StudentProfile from "../student_profiles";

interface PhDAttributes {
    phdeducationId: number;
    studentId: number;
    universityName: string;
    researchArea: string;
    supervisorName: string;
    startYear: number;
    endYear: number;
    is_deleted?: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface PhDEducationInput extends Optional<PhDAttributes, "phdeducationId" | "is_deleted"> { }
export interface PhDEducationOutput extends Required<PhDAttributes> { }

class PhDEducation extends Model<PhDAttributes, PhDEducationInput> implements PhDAttributes {
    public phdeducationId!: number;
    public studentId!: number;
    public universityName!: string;
    public researchArea!: string;
    public supervisorName!: string;
    public startYear!: number;
    public endYear!: number;
    public is_deleted?: boolean;

    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;
}

PhDEducation.init(
    {
        phdeducationId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
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

        universityName: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        researchArea: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        supervisorName: {
            type: DataTypes.STRING(150),
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

        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },

    {
        sequelize: sequelizeConnection,
        tableName: "phd_education",
        timestamps: true,
        paranoid: true,
    }
);

StudentProfile.hasOne(PhDEducation, {
    foreignKey: "studentId",
    as: "phd_education",
});

PhDEducation.belongsTo(StudentProfile, {
    foreignKey: "studentId",
    as: "student_profile",
});

export default PhDEducation;