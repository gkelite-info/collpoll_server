import { Model, DataTypes, Optional } from "sequelize";
import sequelizeConnection from "../../config";
import College from "../college";

interface StreamAttributes {
    streamId: number;
    name: string;
    collegeId: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface StreamInput extends Optional<StreamAttributes, "streamId"> { }
export interface StreamOutput extends Required<StreamAttributes> { }

class Stream extends Model<StreamAttributes, StreamInput> implements StreamAttributes {
    public streamId!: number;
    public name!: string;
    public collegeId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Stream.init(
    {
        streamId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        collegeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "colleges",
                key: "collegeId",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "streams",
        timestamps: true,
        paranoid: true,
    }
);

College.hasMany(Stream, { foreignKey: "collegeId", as: "streams" });
Stream.belongsTo(College, { foreignKey: "collegeId", as: "college" });

export default Stream;
