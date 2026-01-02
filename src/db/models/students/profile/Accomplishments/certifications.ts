import { Model, DataTypes, Optional} from "sequelize";
import sequelizeConnection from "../../../../config";
import StudentProfile from "../../student_profiles";

interface CertificationAttributes {
    certificateId: number;
    studentId: number;
    certificationName: string;
    certification_completionId: string;
    certificateLink: string;
    uploadCertificate: string;
    startDate: number;
    endDate: number;
    is_deleted?: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface CertificationInput extends Optional<CertificationAttributes, "certificateId" | "is_deleted">{ }
export interface CertificationOutput extends Required<CertificationAttributes>{ }

class Certification extends Model<CertificationAttributes, CertificationInput> implements CertificationAttributes {
    public certificateId!: number;
    public studentId!: number;
    public certificationName!: string;
    public certification_completionId!: string;
    public certificateLink!: string;
    public uploadCertificate!: string;
    public startDate!: number;
    public endDate!: number;
    public is_deleted?: boolean;
    
    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;
}

Certification.init(
    {
        certificateId: {
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
        
        certificationName: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        certification_completionId: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        certificateLink: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

         uploadCertificate: {
            type: DataTypes.TEXT,
            allowNull: false,
         },

         startDate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        endDate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },

    {
        sequelize: sequelizeConnection,
        tableName: "certifications",
        timestamps: true,
        paranoid: true,
    }
);

StudentProfile.hasOne(Certification, {
    foreignKey: "studentId",
    as: "certifications",
});

Certification.belongsTo(StudentProfile, {
    foreignKey: "studentId",
    as: "student_profile",
});

export default Certification;

