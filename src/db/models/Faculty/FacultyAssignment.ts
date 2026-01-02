import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../../config";
import User from "../user";

interface AssignmentAttributes {
  assignmentId: number;
  facultyId: number;
  assignmentTitle: string;
  topicName: string;
  dateAssignedInt: number;
  submissionDeadlineInt: number;
  totalSubmissionsExpected: number;
  totalMarks: number;
  instructions?: string;
  is_deleted?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface AssignmentInput extends Optional<AssignmentAttributes, "assignmentId" | "is_deleted"> { }
export interface AssignmentOutput extends Required<AssignmentAttributes> { }

class FacultyAssignment extends Model<AssignmentAttributes, AssignmentInput> implements AssignmentAttributes {
  public assignmentId!: number;
  public facultyId!: number;
  public assignmentTitle!: string;
  public topicName!: string;
  public dateAssignedInt!: number;
  public submissionDeadlineInt!: number;
  public totalSubmissionsExpected!: number;
  public totalMarks!: number;
  public instructions?: string;
  public is_deleted?: boolean;

  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
}

FacultyAssignment.init(
  {
    assignmentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    facultyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "userId",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    assignmentTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    topicName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    dateAssignedInt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    submissionDeadlineInt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    totalSubmissionsExpected: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    totalMarks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    instructions: {
      type: DataTypes.TEXT,
    },

    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "faculty_assignments",
    timestamps: true,
    paranoid: true,
  }
);

User.hasMany(FacultyAssignment, {
  foreignKey: "facultyId",
  as: "assignments",
});

FacultyAssignment.belongsTo(User, {
  foreignKey: "facultyId",
  as: "faculty",
});
export default FacultyAssignment;
