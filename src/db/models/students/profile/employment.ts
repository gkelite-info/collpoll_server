import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../../../config";

interface EmploymentAttributes {
  employmentId: number;
  studentId: number;

  companyName: string;
  designation: string;
  experienceYears: number;
  experienceMonths: number;
  startDate: Date;
  endDate?: Date | null;
  description?: string | null;

  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface EmploymentInput
  extends Optional<
    EmploymentAttributes,
    "employmentId" | "endDate" | "description" | "isDeleted"
  > {}

class EmploymentDetails
  extends Model<EmploymentAttributes, EmploymentInput>
  implements EmploymentAttributes
{
  public employmentId!: number;
  public studentId!: number;

  public companyName!: string;
  public designation!: string;
  public experienceYears!: number;
  public experienceMonths!: number;
  public startDate!: Date;
  public endDate!: Date | null;
  public description!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

EmploymentDetails.init(
  {
    employmentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "student_profile",
        key: "studentId",
      },
      onDelete: "CASCADE",
    },
    companyName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    experienceYears: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    experienceMonths: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "employment_details",
    timestamps: true,
    paranoid: true,
  }
);

export default EmploymentDetails;
