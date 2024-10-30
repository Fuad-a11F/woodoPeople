export const validateFirstName = (value: string): string | null => {
  const regex = /^[А-ЯA-Z][а-яa-zА-ЯA-Z-]*$/
  if (!regex.test(value)) {
    return 'Имя должно начинаться с заглавной буквы и содержать только буквы и дефис'
  }
  return null
}

export const validateSecondName = validateFirstName

export const validateLogin = (value: string): string | null => {
  const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/
  if (!regex.test(value)) {
    return 'Логин должен содержать от 3 до 20 символов, латиница, цифры, дефис или нижнее подчеркивание'
  }
  return null
}

export const validateEmail = (value: string): string | null => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!regex.test(value)) {
    return 'Некорректный формат email'
  }
  return null
}

export const validatePassword = (value: string): string | null => {
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/
  if (!regex.test(value)) {
    return 'Пароль должен содержать от 8 до 40 символов, минимум одну заглавную букву и цифру'
  }
  return null
}

export const validatePhone = (value: string): string | null => {
  const regex = /^(\+)?\d{10,15}$/
  if (!regex.test(value)) {
    return 'Телефон должен содержать от 10 до 15 цифр и может начинаться с плюса'
  }
  return null
}

export const validateRepeatPassword = (
  password: string,
  repeatPassword: string
): string | null => {
  if (password !== repeatPassword) {
    return 'Пароли не совпадают'
  }
  return null
}
