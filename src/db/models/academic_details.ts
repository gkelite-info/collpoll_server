import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../config";
import User from "./user";
import College from "./college";
import Stream from "./students/stream";

interface AcademicDetailsAttributes {
    academicId: number;
    studentId: number;
    collegeId: number;
    streamId: number;
    admissionYear: number;
    currentYear: string;
    currentSemester: string;
    section?: string;
    rollNumber?: string;
    status: "active" | "graduated" | "dropout";

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface AcademicDetailsInput extends Optional<AcademicDetailsAttributes, "academicId" | "section" | "rollNumber"> { }
export interface AcademicDetailsOutput extends Required<AcademicDetailsAttributes> { }

class AcademicDetails extends Model<AcademicDetailsAttributes, AcademicDetailsInput> implements AcademicDetailsAttributes {
    public academicId!: number;
    public studentId!: number;
    public collegeId!: number;
    public streamId!: number;
    public admissionYear!: number;
    public currentYear!: string;
    public currentSemester!: string;
    public section!: string;
    public rollNumber!: string;
    public status!: "active" | "graduated" | "dropout";

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

AcademicDetails.init(
    {
        academicId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        collegeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "colleges",
                key: "collegeId",
            },
        },
        streamId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "streams",
                key: "streamId",
            },
        },
        admissionYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        currentYear: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        currentSemester: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        section: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        rollNumber: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM("active", "graduated", "dropout"),
            allowNull: false,
            defaultValue: "active",
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "academic_details",
        timestamps: true,
        paranoid: true,
    }
);

User.hasOne(AcademicDetails, { foreignKey: "studentId", as: "academic_details" });
AcademicDetails.belongsTo(User, { foreignKey: "studentId", as: "users" });

College.hasMany(AcademicDetails, { foreignKey: "collegeId", as: "academic_colleges" });
AcademicDetails.belongsTo(College, { foreignKey: "collegeId", as: "colleges" });

Stream.hasMany(AcademicDetails, { foreignKey: "streamId", as: "academic_streams" });
AcademicDetails.belongsTo(Stream, { foreignKey: "streamId", as: "streams" });

export default AcademicDetails;
