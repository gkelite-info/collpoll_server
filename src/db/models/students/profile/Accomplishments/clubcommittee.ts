import { Model, DataTypes, Optional} from "sequelize";
import sequelizeConnection from "../../../../config";
import StudentProfile from "../../student_profiles";

interface ClubCommitteeAttributes{
    clubcommiteeId: number;
    studentId: number;
    clubName: string;
    role: string;
    fromDate: Date;
    toDate: Date;
    description: string;
    is_deleted?: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ClubCommitteeInput extends Optional<ClubCommitteeAttributes, "clubcommiteeId" | "is_deleted">{ }
export interface ClubCommitteeOutput extends Required<ClubCommitteeAttributes>{ }

class ClubComittee extends Model<ClubCommitteeAttributes, ClubCommitteeInput> implements ClubCommitteeAttributes {
    public clubcommiteeId!: number;
    public studentId!: number;
    public clubName!: string;
    public role!: string;
    public fromDate!: Date;
    public toDate!: Date;
    public description!: string;
    public is_deleted?: boolean;

    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;
}

ClubComittee.init(
    {
        clubcommiteeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
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

        clubName: {
            type: DataTypes.STRING,
            allowNull: false,
        
        },

        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        fromDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        toDate: {
            type: DataTypes.DATE,
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
        tableName: "clubcommittee",
        timestamps: true,
        paranoid: true,
    }
);

StudentProfile.hasOne(ClubComittee, {
    foreignKey: "studentId",
    as: "clubcommittee",
});

ClubComittee.belongsTo(StudentProfile, {
    foreignKey: "studentId",
    as: "student_profile",
});

export default ClubComittee;
