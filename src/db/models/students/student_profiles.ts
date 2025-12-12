import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../../config";
import User from "../user";

interface StudentProfileAttributes {
    studentId: number;
    fatherName: string;
    motherName?: string;
    guardianName?: string;
    fatherMobile: string;
    motherMobile?: string;
    guardianMobile?: string;
    address: string;
    dateOfBirth: Date;
    gender: string;
    photoUrl?: string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface StudentProfileInput extends Optional<StudentProfileAttributes, "motherName" | "guardianName" | "motherMobile" | "guardianMobile" | "photoUrl"> { }
export interface StudentProfileOutput extends Required<StudentProfileAttributes> { }

class StudentProfile extends Model<StudentProfileAttributes, StudentProfileInput> implements StudentProfileAttributes {
    public studentId!: number;
    public fatherName!: string;
    public motherName!: string;
    public guardianName!: string;
    public fatherMobile!: string;
    public motherMobile!: string;
    public guardianMobile!: string;
    public address!: string;
    public dateOfBirth!: Date;
    public gender!: string;
    public photoUrl!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

StudentProfile.init(
    {
        studentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: "users",
                key: "userId",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        fatherName: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        motherName: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        guardianName: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        fatherMobile: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        motherMobile: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        guardianMobile: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        photoUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "student_profile",
        timestamps: true,
        paranoid: true,
    }
);

User.hasOne(StudentProfile, { foreignKey: "studentId", as: "student_profiles" });
StudentProfile.belongsTo(User, { foreignKey: "studentId", as: "users" });

export default StudentProfile;
