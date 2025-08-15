import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from "../../database";
import { validateCNPJ, validateCPF } from "../../utils/validators.js"
import { UserAttributes, UserCreationAttributes } from './users.types';

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public personType!: 'FISICA' | 'JURIDICA' | null;
  public cnpj!: string | null;
  public cpf!: string | null;
  public full_name!: string;
  public mobile!: string;
  public phone!: string | null;
  public email!: string;
  public zip_code!: string;
  public street!: string;
  public number!: string;
  public complement!: string | null;
  public city!: string;
  public neighborhood!: string;
  public state!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Validações personalizadas no modelo
  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        personType: {
          type: DataTypes.ENUM('FISICA', 'JURIDICA'),
          allowNull: true,
          field: 'person_type',
        },
        cnpj: {
          type: DataTypes.STRING(14), // Pode conter zeros à esquerda e caracteres especiais
          allowNull: true,
          unique: true,
          validate: {
            len: [14, 14],
            isValidCNPJ(value: string) {
              if (this.personType === 'JURIDICA' && !value) {
                throw new Error('CNPJ obrigatório para JURIDICA');
              }
              if (value && !validateCNPJ(value)) {
                throw new Error('CNPJ inválido');
              }
            },
          },
        },
        cpf: {
          type: DataTypes.STRING(11), // Pode conter zeros à esquerda e caracteres especiais
          allowNull: true,
          unique: true,
          validate: {
            len: [11, 11],
            isValidCPF(value: string) {
              if (this.personType === 'FISICA' && !value) {
                throw new Error('CPF obrigatório para FISICA');
              }
              if (value && !validateCPF(value)) {
                throw new Error('CPF inválido');
              }
            },
          },
        },
        full_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: 'full_name',
        },
        mobile: {
          type: DataTypes.STRING(20), // Pode conter +55 na composição
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING(20), // Pode conter +55 na composição
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        zip_code: {
          type: DataTypes.STRING(10), // Pode conter zeros à esquerda e caracteres especiais
          allowNull: false,
          field: 'zip_code',
        },
        street: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        number: {
          type: DataTypes.STRING(10), // Pode ter s/n
          allowNull: false,
        },
        complement: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        city: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        neighborhood: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        state: {
          type: DataTypes.STRING(2),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        underscored: true,
      }
    );

    return User;
  }
}

// Inicializa o modelo
User.initModel(sequelize);

export default User;