import { Op } from 'sequelize'; 
import User from './users.model';
import {
  validateCPF,
  validateCNPJ,
  validateCEP,
  validateState,
  validatePhone,
  validateEmail,
} from '../../utils/validators';

class UserService {
  async createUser(data) {
    const {
      personType,
      cnpj,
      cpf,
      full_name,
      mobile,
      phone,
      email,
      zip_code,
      street,
      number,
      city,
      neighborhood,
      state,
    } = data;

    // Validações manuais antes de qualquer query ao banco
    if (!personType || !['FISICA', 'JURIDICA'].includes(personType)) {
      throw new Error('Tipo de pessoa inválido (deve ser FISICA ou JURIDICA)');
    }

    if (personType === 'FISICA') {
      if (!cpf) throw new Error('CPF é obrigatório para pessoa física');
      if (!validateCPF(cpf)) throw new Error('CPF inválido');
    } else if (personType === 'JURIDICA') {
      if (!cnpj) throw new Error('CNPJ é obrigatório para pessoa jurídica');
      if (!validateCNPJ(cnpj)) throw new Error('CNPJ inválido');
    }

    if (!full_name || full_name.trim() === '') throw new Error('Nome é obrigatório');

    if (!mobile) throw new Error('Celular é obrigatório');
    if (!validatePhone(mobile)) throw new Error('Celular inválido');

    if (phone && !validatePhone(phone)) throw new Error('Telefone inválido');

    if (!email) throw new Error('Email é obrigatório');
    if (!validateEmail(email)) throw new Error('Email inválido');

    if (!zip_code) throw new Error('CEP é obrigatório');
    if (!validateCEP(zip_code)) throw new Error('CEP inválido');

    if (!street || street.trim() === '') throw new Error('Rua é obrigatória');

    if (!number || number.trim() === '') throw new Error('Número é obrigatório');

    if (!city || city.trim() === '') throw new Error('Cidade é obrigatória');

    if (!neighborhood || neighborhood.trim() === '') throw new Error('Bairro é obrigatório');

    if (!state) throw new Error('Estado é obrigatório');
    if (!validateState(state)) throw new Error('Estado inválido (deve ser uma UF brasileira)');

    const exists = await User.findOne({
      where: {
        [Op.or]: [
          ...(cpf ? [{ cpf }] : []), // Inclui CPF na busca se fornecido
          ...(cnpj ? [{ cnpj }] : []), // Inclui CNPJ na busca se fornecido
          { email },
        ],
      },
    });

    if (exists) {
      throw new Error('CPF, CNPJ ou Email já cadastrado');
    }

    // Criação do usuário
    const user = await User.create(data);
    return user;
  }
}

export default new UserService();