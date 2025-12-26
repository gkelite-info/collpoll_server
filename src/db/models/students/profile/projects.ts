import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../../../config";
import StudentProfile from "../student_profiles";

interface ProjectAttributes {
  projectId: number;
  studentId: number;
  projectName: string;
  domain: string;
  startDate: Date;
  endDate: Date;
  projectUrl?: string;
  toolsAndTechnologies?: string[];
  description?: string;
  isDeleted?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ProjectDetailsInput
  extends Optional<ProjectAttributes, "projectId" | "isDeleted"> {}
export interface ProjectOutput extends Required<ProjectAttributes> {}

class ProjectDetails
  extends Model<ProjectAttributes, ProjectDetailsInput>
  implements ProjectAttributes
{
  public projectId!: number;
  public studentId!: number;
  public projectName!: string;
  public domain!: string;
  public startDate!: Date;
  public endDate!: Date;
  public projectUrl?: string;
  public toolsAndTechnologies?: string[];
  public description?: string;
  public isDeleted?: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

ProjectDetails.init(
  {
    projectId: {
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
    projectName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    domain: {
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
    projectUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    toolsAndTechnologies: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
    tableName: "project_details",
  }
);

// Relationships
StudentProfile.hasMany(ProjectDetails, {
  foreignKey: "studentId",
  as: "projects",
});

ProjectDetails.belongsTo(StudentProfile, {
  foreignKey: "studentId",
  as: "student",
});

export default ProjectDetails;
