import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../../../../config";

interface SkillCategoryAttributes {
    categoryId: number;
    name: string;
    is_deleted?: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface SkillCategoryInput extends Optional<SkillCategoryAttributes, "categoryId" | "is_deleted"> { }
export interface SkillCategoryOutput extends Required<SkillCategoryAttributes> { }

class SkillCategory extends Model<SkillCategoryAttributes, SkillCategoryInput> implements SkillCategoryAttributes {
    public categoryId!: number;
    public name!: string;
    public is_deleted!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

SkillCategory.init({
    categoryId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
},
    {
        sequelize: sequelizeConnection,
        tableName: "skill_categories",
        timestamps: true,
        paranoid: true,
    }
);

// SkillCategory.hasMany(Skill, { foreignKey: "categoryId", as: "skills", });
// Skill.belongsTo(SkillCategory, { foreignKey: "categoryId", as: "category", });

export default SkillCategory;
