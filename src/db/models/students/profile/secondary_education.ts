import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../../../config";
import StudentProfile from "../student_profiles";

interface SecondaryEducationAttributes {
  secondaryEducationId: number;
  studentId: number;
  institutionName: string;
  board: string;
  mediumOfStudy: string;
  yearOfPassing: number;
  percentage: number;
  location: string;
  is_deleted?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface SecondaryEducationInput  extends Optional<SecondaryEducationAttributes,  "secondaryEducationId" | "is_deleted"> {}
export interface SecondaryEducationOutput extends Required<SecondaryEducationAttributes> {}
 

class SecondaryEducation extends Model< SecondaryEducationAttributes, SecondaryEducationInput > implements SecondaryEducationAttributes {
  public secondaryEducationId!: number;
  public studentId!: number;
  public institutionName!: string;
  public board!: string;
  public mediumOfStudy!: string;
  public yearOfPassing!: number;
  public percentage!: number;
  public location!: string;
  public is_deleted?: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

SecondaryEducation.init(
  {
    secondaryEducationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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

    institutionName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    board: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    mediumOfStudy: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    yearOfPassing: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    percentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "secondary_education",
    timestamps: true,
    paranoid: true,
  }
);

StudentProfile.hasOne(SecondaryEducation, {
  foreignKey: "studentId",
  as: "secondary_education",
});

SecondaryEducation.belongsTo(StudentProfile, {
  foreignKey: "studentId",
  as: "student_profile",
});

export default SecondaryEducation;
