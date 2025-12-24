import { Model, DataTypes, Optional } from "sequelize";
import StudentProfile from "../../student_profiles";
import sequelizeConnection from "../../../../config";

interface UserSkillAttributes {
    userSkillId: number;
    studentId: number;
    skillId: number;
    proficiency?: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserSkillInput extends Optional<UserSkillAttributes, "userSkillId" | "proficiency"> { }
export interface UserSkillOutput extends Required<UserSkillAttributes> { }

class UserSkill extends Model<UserSkillAttributes, UserSkillInput> implements UserSkillAttributes {
    public userSkillId!: number;
    public studentId!: number;
    public skillId!: number;
    public proficiency?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserSkill.init({
    userSkillId: {
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
        onUpdate: "CASCADE",
    },
    skillId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "skills",
            key: "skillId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    proficiency: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
},
    {
        sequelize: sequelizeConnection,
        tableName: "user_skills",
        timestamps: true,
    }
);

StudentProfile.hasMany(UserSkill, { foreignKey: "studentId", as: "student_skills", });
UserSkill.belongsTo(StudentProfile, { foreignKey: "studentId", as: "student", });

export default UserSkill;
