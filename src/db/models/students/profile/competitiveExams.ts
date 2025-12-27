import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../../../config";
import StudentProfile from "../student_profiles";

interface CompetitiveExamAttributes {
  competitiveExamsId: number;
  studentId: number;
  examName: string;
  score: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CompetitiveExamInput
  extends Optional<
    CompetitiveExamAttributes,
    "competitiveExamsId" | "isDeleted"
  > {}

export interface CompetitiveExamOutput
  extends Required<CompetitiveExamAttributes> {}

class CompetitiveExam
  extends Model<CompetitiveExamAttributes, CompetitiveExamInput>
  implements CompetitiveExamAttributes
{
  public competitiveExamsId!: number;
  public studentId!: number;
  public examName!: string;
  public score!: string;
  public isDeleted?: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

CompetitiveExam.init(
  {
    competitiveExamsId: {
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
    examName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.DECIMAL(6, 2),
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
    tableName: "competitive_exams",
  }
);

StudentProfile.hasMany(CompetitiveExam, {
  foreignKey: "studentId",
  as: "competitive_exams",
});
CompetitiveExam.belongsTo(StudentProfile, {
  foreignKey: "studentId",
  as: "student",
});

export default CompetitiveExam;
