export interface UserAttributes {
  id?: number;
  personType: 'FISICA' | 'JURIDICA' | null;
  cnpj: string | null;
  cpf: string | null;
  full_name: string;
  mobile: string;
  phone: string | null;
  email: string;
  zip_code: string;
  street: string;
  number: string;
  complement: string | null;
  city: string;
  neighborhood: string;
  state: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserCreationAttributes = Partial<UserAttributes>;

export type UserData = UserCreationAttributes;