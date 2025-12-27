import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../../../config";
import StudentProfile from "../student_profiles";

interface AcademicAchievementAttributes {
  achievementId: number;
  studentId: number;
  achievementName: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AcademicAchievementInput
  extends Optional<
    AcademicAchievementAttributes,
    "achievementId" | "isDeleted"
  > {}

class AcademicAchievement
  extends Model<AcademicAchievementAttributes, AcademicAchievementInput>
  implements AcademicAchievementAttributes
{
  public achievementId!: number;
  public studentId!: number;
  public achievementName!: string;
  public isDeleted?: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AcademicAchievement.init(
  {
    achievementId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "student_profile", key: "studentId" },
    },
    achievementName: {
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
    sequelize: sequelizeConnection,
    tableName: "academic_achievements",
  }
);

StudentProfile.hasMany(AcademicAchievement, {
  foreignKey: "studentId",
  as: "academic_achievements",
});
AcademicAchievement.belongsTo(StudentProfile, { foreignKey: "studentId" });

export default AcademicAchievement;
