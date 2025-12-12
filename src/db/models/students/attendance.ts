import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../../config";
import User from "../user";
import Subject from "./subject";

interface AttendanceAttributes {
    attendanceId: number;
    studentId: number;
    date: Date;
    status: "present" | "absent" | "late";
    subjectId: number;
    semester: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface AttendanceInput extends Optional<AttendanceAttributes, "attendanceId"> { }

export interface AttendanceOutput extends Required<AttendanceAttributes> { }

class Attendance extends Model<AttendanceAttributes, AttendanceInput> implements AttendanceAttributes {
    public attendanceId!: number;
    public studentId!: number;
    public date!: Date;
    public status!: "present" | "absent" | "late";
    public subjectId!: number;
    public semester!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Attendance.init(
    {
        attendanceId: {
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
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("present", "absent", "late"),
            allowNull: false,
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
    },
    {
        sequelize: sequelizeConnection,
        tableName: "attendance",
        timestamps: true,
        paranoid: true,
    }
);

User.hasMany(Attendance, { foreignKey: "studentId", as: "attendance_records" });
Attendance.belongsTo(User, { foreignKey: "studentId", as: "student" });

Subject.hasMany(Attendance, { foreignKey: "subjectId", as: "subject_attendance" });
Attendance.belongsTo(Subject, { foreignKey: "subjectId", as: "subject" });

export default Attendance;
