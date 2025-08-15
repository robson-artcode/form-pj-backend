// Função para validar CPF (algoritmo oficial brasileiro)
function validateCPF(cpf) {
  cpf = cpf.replace(/\D/g, ''); // Remove não dígitos
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

// Função para validar CNPJ (algoritmo oficial brasileiro)
function validateCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, ''); // Remove não dígitos
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

  let sum = 0;
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  let digits = cnpj.substring(size);
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  size += 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
}

// Função para validar CEP (formato brasileiro: 8 dígitos, com ou sem hífen)
function validateCEP(cep) {
  cep = cep.replace(/\D/g, ''); // Remove não dígitos
  return cep.length === 8;
}

// Função para validar estado (UF brasileira: 2 letras maiúsculas)
function validateState(state) {
  const ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  return ufs.includes(state.toUpperCase());
}

// Função para validar número de telefone/mobile (exemplo: permite +55 e formatos comuns, mas ajustável)
function validatePhone(phone) {
  if (!phone) return true; // Para campos opcionais
  const regex = /^(\+55)?\s?(\(?\d{2}\)?)\s?\d{4,5}-?\d{4}$/;
  return regex.test(phone);
}

// Função para validar email (além do isEmail do Sequelize, mas pode ser redundante)
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Exportando as funções
export {
  validateCPF,
  validateCNPJ,
  validateCEP,
  validateState,
  validatePhone,
  validateEmail,
};