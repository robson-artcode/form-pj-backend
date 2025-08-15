import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const PessoaJuridica = sequelize.define("users", {
    personType: {
        type: DataTypes.ENUM('FISICA', 'JURIDICA'),
        allowNull: false,
        field: 'person_type',
    },
    cnpj: {
        type: DataTypes.STRING(14), // Pode conter zeros à esquerda e caracteres especiais
        allowNull: false,
        unique: true,
        validate: {
            len: [14, 14],
        },
    },
    cpf: {
        type: DataTypes.STRING(11), // Pode conter zeros à esquerda e caracteres especiais
        allowNull: false,
        unique: true,
        validate: {
            len: [11, 11],
        },
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    mobile: {
        type: DataTypes.STRING(20), // Pode conter +55 na composição
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(20) // Pode conter +55 na composição
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    cep: {
        type: DataTypes.STRING(10), // Pode conter zeros à esquerda e caracteres especiais
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    number: {
        type: DataTypes.STRING(10),  // Pode ter s/n
        allowNull: false,
    },
    complement: {
        type: DataTypes.STRING(255)
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
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true, 
});

export default PessoaJuridica;
