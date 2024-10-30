export interface RegistrationProps {
  onRegister: () => void
}

export interface IRegisterError {
  first_name: string | null
  second_name: string | null
  login: string | null
  email: string | null
  password: string | null
  repeatPassword: string | null
  phone: string | null
}
