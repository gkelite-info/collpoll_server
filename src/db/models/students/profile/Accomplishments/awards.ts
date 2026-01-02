import { Model, DataTypes, Optional} from "sequelize";
import sequelizeConnection from "../../../../config";
import StudentProfile from "../../student_profiles";

interface AwardsAttributes {
    awardId: number;
    studentId: number;
    awardName: string;
    issuedBy: string;
   dateReceived: Date;
    category: string;
    description: string;
    is_deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date
}

export interface AwardsInput extends Optional<AwardsAttributes, "awardId" | "is_deleted" | "category"> { }
export interface AwardOutput extends Required<AwardsAttributes> { }

class Awards extends Model<AwardsAttributes, AwardsInput> implements AwardsAttributes {
    public awardId!: number;
    public studentId!: number;
    public awardName!: string;
    public issuedBy!: string;
    public dateReceived!: Date;
    public category!: string;
    public description!: string;
     public is_deleted?: boolean;
    
    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;
}

Awards.init(
    {
        awardId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
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

        awardName: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        issuedBy: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        dateReceived: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        category: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },

          is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },

    {
        sequelize: sequelizeConnection,
        tableName: "awards",
        timestamps: true,
        paranoid: true,
    }
);

StudentProfile.hasOne(Awards, {
    foreignKey: "studentId",
    as: "awards",
});

Awards.belongsTo(StudentProfile, {
    foreignKey: "studentId",
    as: "student_profile",
});

export default Awards;

