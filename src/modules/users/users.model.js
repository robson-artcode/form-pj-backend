import { DataTypes } from "sequelize";
import sequelize from "../../database";
import { validateCNPJ, validateCPF } from "../../utils/validators.js"

const Users = sequelize.define("users", {
    personType: {
        type: DataTypes.ENUM('FISICA', 'JURIDICA'),
        allowNull: true,
        field: 'person_type',
    },
    cnpj: {
        type: DataTypes.STRING(14), // Pode conter zeros à esquerda e caracteres especiais
        allowNull: false,
        unique: true,
        validate: {
            len: [14, 14],
            isValidCNPJ(value) {
                if (this.personType === 'JURIDICA' && !value) {
                    throw new Error('CNPJ obrigatório para JURIDICA');
                }
                if (value && !validateCNPJ(value)) { // Importe a função
                    throw new Error('CNPJ inválido');
                }
            }
        },
    },
    cpf: {
        type: DataTypes.STRING(11), // Pode conter zeros à esquerda e caracteres especiais
        allowNull: false,
        unique: true,
        validate: {
            len: [11, 11],
            isValidCPF(value) {
                if (this.personType === 'FISICA' && !value) {
                    throw new Error('CPF obrigatório para FISICA');
                }
                if (value && !validateCPF(value)) { // Importe a função
                    throw new Error('CPF inválido');
                }
            }
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

export default Users;
