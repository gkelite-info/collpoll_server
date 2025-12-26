import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../../../config";
import StudentProfile from "../student_profiles";

interface InternshipAttributes {
  internshipId: number;
  studentId: number;
  organizationName: string;
  role: string;
  startDate: Date;
  endDate: Date;
  projectName: string;
  projectUrl: string;
  location: string;
  domain: string;
  description: string;
  isDeleted?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface InternshipInput
  extends Optional<InternshipAttributes, "internshipId" | "isDeleted"> {}
export interface InternshipOutput extends Required<InternshipAttributes> {}

class InternshipDetails
  extends Model<InternshipAttributes, InternshipInput>
  implements InternshipAttributes
{
  public internshipId!: number;
  public studentId!: number;
  public organizationName!: string;
  public role!: string;
  public startDate!: Date;
  public endDate!: Date;
  public projectName!: string;
  public projectUrl!: string;
  public location!: string;
  public domain!: string;
  public description!: string;
  public isDeleted?: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

InternshipDetails.init(
  {
    internshipId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "student_profile",
        key: "studentId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    organizationName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    projectName: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    projectUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    domain: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
    tableName: "internship_details",
  }
);

StudentProfile.hasOne(InternshipDetails, {
  foreignKey: "studentId",
  as: "internship_details",
});
InternshipDetails.belongsTo(StudentProfile, {
  foreignKey: "studentId",
  as: "students",
});

export default InternshipDetails;
