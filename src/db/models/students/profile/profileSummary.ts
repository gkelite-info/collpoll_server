import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../../../config";
import StudentProfile from "../student_profiles";

interface ProfileSummaryAttributes {
  summaryId: number;
  studentId: number;
  summary: string;
  isDeleted?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ProfileSummaryInput
  extends Optional<ProfileSummaryAttributes, "summaryId" | "isDeleted"> {}
export interface ProfileSummaryOutput
  extends Required<ProfileSummaryAttributes> {}

class ProfileSummaryDetails
  extends Model<ProfileSummaryAttributes, ProfileSummaryInput>
  implements ProfileSummaryAttributes
{
  public summaryId!: number;
  public studentId!: number;
  public summary!: string;
  public isDeleted?: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

ProfileSummaryDetails.init(
  {
    summaryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "student_profile",
        key: "studentId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "profile_summary",
  }
);

StudentProfile.hasOne(ProfileSummaryDetails, {
  foreignKey: "studentId",
  as: "profile_summary",
});
ProfileSummaryDetails.belongsTo(StudentProfile, {
  foreignKey: "studentId",
  as: "students",
});

export default ProfileSummaryDetails;
