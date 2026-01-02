import { Model, DataTypes, Optional} from "sequelize";
import sequelizeConnection from "../../../../config";
import StudentProfile from "../../student_profiles";

interface LanguageAttributes{
    languageId: number;
    studentId: number;
    languageName: string[];
    is_deleted?: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date
}

export interface LanguageInput extends Optional<LanguageAttributes, "languageId" | "is_deleted">{ }
export interface LanguageOutput extends Required<LanguageAttributes>{ }

class Language extends Model<LanguageAttributes, LanguageInput> implements LanguageAttributes {
    public languageId!: number;
    public studentId!: number;
    public languageName!: string[];
    public is_deleted!: boolean;

    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;
}

Language.init(
    {
        languageId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
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

        languageName: {
             type: DataTypes.ARRAY(DataTypes.STRING),
             allowNull: false,
        },
        

           is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },

    {
        sequelize: sequelizeConnection,
        tableName: "language",
        timestamps: true,
        paranoid: true,
    }
);

StudentProfile.hasOne(Language, {
    foreignKey: "studentId",
    as: "language",
});

Language.belongsTo(StudentProfile, {
    foreignKey: "studentId",
    as: "student_profile",
});

export default Language;

        
    
