import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../../../../config";
import SkillCategory from "./SkillCategory";

interface SkillAttributes {
    skillId: number;
    categoryId: number;
    name: string;
    is_deleted?: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface SkillInput extends Optional<SkillAttributes, "skillId" | "is_deleted"> { }
export interface SkillOutput extends Required<SkillAttributes> { }

class Skill extends Model<SkillAttributes, SkillInput> implements SkillAttributes {
    public skillId!: number;
    public categoryId!: number;
    public name!: string;
    public is_deleted!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Skill.init(
    {
        skillId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "skill_categories",
                key: "categoryId",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        name: {
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
        tableName: "skills",
        timestamps: true,
        paranoid: true,
    }
);

// Skill.belongsToMany(StudentProfile, { through: UserSkill, foreignKey: "skillId", otherKey: "studentId", as: "students", });
// StudentProfile.belongsToMany(Skill, { through: UserSkill, foreignKey: "studentId", otherKey: "skillId", as: "skills", });
Skill.belongsTo(SkillCategory, { foreignKey: "categoryId", as: "category", });

export default Skill;
