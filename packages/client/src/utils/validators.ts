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
  // Проверяем длину строки
  if (value.length < 8 || value.length > 40) {
    return 'Пароль должен содержать от 8 до 40 символов'
  }

  // Проверяем, что в строке есть хотя бы одна заглавная буква и хотя бы одна цифра
  const hasUppercase = /[A-Z]/.test(value)
  const hasDigit = /\d/.test(value)

  // Если оба условия выполнены, возвращаем true, иначе false
  return hasUppercase && hasDigit
    ? null
    : 'Пароль должен содержать хотя бы одну заглавную букву и цифру'
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

/**
 * Экранирование HTML-символов для предотвращения XSS.
 * @param input - Входная строка
 * @returns Экранированная строка
 */
export const escapeHTML = (input: string): string => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

/**
 * Проверка комментария на длину и недопустимые символы.
 * @param comment - Комментарий
 * @returns Объект с результатом проверки
 */
export const validateComment = (
  comment: string
): { isValid: boolean; error: string | null } => {
  if (comment.length > 500) {
    return {
      isValid: false,
      error: 'Комментарий слишком длинный (максимум 500 символов)',
    }
  }

  if (!/^[a-zA-Zа-яА-Я0-9\s.,!?]+$/u.test(comment)) {
    return {
      isValid: false,
      error: 'Комментарий содержит недопустимые символы',
    }
  }

  return { isValid: true, error: null }
}
