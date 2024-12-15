import { Request, Response, NextFunction } from 'express'

const TEST_TOKEN = 'test-token'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization

  // Проверка наличия заголовка авторизации
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(403).json({ error: 'Пользователь не авторизован' })
    return
  }

  const token = authHeader.split(' ')[1]

  // Пример проверки токена
  if (!validateToken(token)) {
    res.status(403).json({ error: 'Пользователь не авторизован' })
    return
  }

  // Продолжение обработки запроса
  next()
}

const validateToken = (token: string): boolean => {
  // Пример: простой тестовый токен
  return token === TEST_TOKEN
}
