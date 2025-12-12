import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../../config";
import StudentProfile from "./student_profiles";

interface FeeAttributes {
    feeId: number;
    studentId: number;
    amount: number;
    dueDate: Date;
    paid: boolean;
    paymentDate?: Date | null;
    year: number;
    semester: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface FeeInput extends Optional<FeeAttributes, "feeId" | "paid" | "paymentDate"> { }
export interface FeeOutput extends Required<FeeAttributes> { }

class Fee extends Model<FeeAttributes, FeeInput> implements FeeAttributes {
    public feeId!: number;
    public studentId!: number;
    public amount!: number;
    public dueDate!: Date;
    public paid!: boolean;
    public paymentDate!: Date | null;
    public year!: number;
    public semester!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Fee.init(
    {
        feeId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "students",
                key: "studentId",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        dueDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        paymentDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        semester: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "fees",
        timestamps: true,
        paranoid: true,
    }
);

StudentProfile.hasMany(Fee, { foreignKey: "studentId", as: "fees" });
Fee.belongsTo(StudentProfile, { foreignKey: "studentId", as: "student" });

export default Fee;
