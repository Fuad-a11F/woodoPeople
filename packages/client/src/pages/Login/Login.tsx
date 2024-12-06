import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Box, Typography } from '@mui/material'
import { LoginProps } from './types'
import { SignInRequest } from '../../api/types'
import { getUserData, signIn } from '../../api/api'
import { validateLogin, validatePassword } from '../../utils/validators'
import { storeUserData } from '../../utils/storeUserData'

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate()
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState({
    login: '',
    password: '',
  })

  const handleBlur = (field: string, value: string) => {
    let error: string | null = null
    if (field === 'login') {
      error = validateLogin(value)
    } else if (field === 'password') {
      error = validatePassword(value)
    }
    setFieldErrors(prevErrors => ({ ...prevErrors, [field]: error || '' }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    const loginError = validateLogin(login)
    const passwordError = validatePassword(password)

    setFieldErrors({
      login: loginError || '',
      password: passwordError || '',
    })

    if (loginError || passwordError) {
      setError('Пожалуйста, исправьте ошибки и повторите попытку')
      return
    }

    try {
      const data: SignInRequest = { login, password }
      const response = await signIn(data)

      if (!response.reason) {
        const userData = await getUserData()
        storeUserData(userData)
        onLogin()
        navigate('/')
      } else if (typeof response === 'object' && response.reason) {
        setError(response.reason)
      }
    } catch (err) {
      console.error('Ошибка при авторизации:', err)
      setError('Ошибка авторизации. Проверьте логин и пароль.')
    }
  }

  const handleRegistrationClick = () => {
    navigate('/registration')
  }

  const handleYandexLogin = async () => {
    try {
      const redirectUri = 'https://local.ya-praktikum.tech'
      // const redirectUri = 'http://localhost:3000'
      const serviceId = await getServiceId(redirectUri)

      console.log('Получен serviceId:', serviceId)

      const authUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}`
      console.log('Перенаправляем на URL авторизации Яндекса:', authUrl)

      window.location.href = authUrl
    } catch (err) {
      console.error('Ошибка при авторизации через Яндекс:', err)
      setError('Не удалось начать авторизацию через Яндекс.')
    }
  }

  const getServiceId = async (redirectUri: string): Promise<string> => {
    console.log('Запрашиваем service_id с redirect_uri:', redirectUri)
    const response = await fetch(
      `https://ya-praktikum.tech/api/v2/oauth/yandex/service-id?redirect_uri=${encodeURIComponent(
        redirectUri
      )}`,
      {
        credentials: 'include',
      }
    )

    if (!response.ok) {
      throw new Error('Ошибка при получении service_id')
    }

    const data = await response.json()
    console.log('Ответ от сервера при получении service_id:', data)

    return data.service_id
  }

  const handleOAuthCode = async (code: string) => {
    try {
      const redirectUri = 'https://local.ya-praktikum.tech'
      // const redirectUri = 'http://localhost:3000'
      const data = { code, redirect_uri: redirectUri }

      console.log('Отправляем POST-запрос на /oauth/yandex с данными:', data)

      const response = await fetch(
        'https://ya-praktikum.tech/api/v2/oauth/yandex',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
        }
      )

      console.log('Статус ответа:', response.status)
      console.log('Заголовки ответа:', response.headers)

      const contentType = response.headers.get('Content-Type')
      const responseData = contentType?.includes('application/json')
        ? await response.json()
        : await response.text()

      console.log('Ответ от сервера при обмене кода на токен:', responseData)

      if (!response.ok) {
        throw new Error(
          responseData.reason || 'Ошибка авторизации через Яндекс.'
        )
      }

      console.log('Токен успешно получен. Загружаем данные пользователя...')
      const userData = await getUserData()
      console.log('Данные пользователя:', userData)

      storeUserData(userData)
      onLogin()
      navigate('/main')
    } catch (err) {
      console.error('Ошибка при обмене кода на токен:', err)
      setError(
        err instanceof Error ? err.message : 'Ошибка при обмене кода на токен.'
      )
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const code = searchParams.get('code')

    if (code) {
      console.log('Код авторизации найден в URL:', code)
      handleOAuthCode(code).then(() => {
        window.history.replaceState({}, document.title, '')
      })
    } else {
      console.log('Код авторизации отсутствует в URL.')
    }
  }, [])

  return (
    <Box display="flex" height="100vh">
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <img
          src="/woodoku.jpg"
          alt="Login Illustration"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </Box>
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <Box width="80%" maxWidth="400px">
          <Typography variant="h4" component="h1" gutterBottom>
            Авторизация
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Логин"
              margin="normal"
              type="text"
              value={login}
              onChange={e => setLogin(e.target.value)}
              onBlur={e => handleBlur('login', e.target.value)}
              helperText={fieldErrors.login}
              error={Boolean(fieldErrors.login)}
              required
            />
            <TextField
              fullWidth
              label="Пароль"
              margin="normal"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={e => handleBlur('password', e.target.value)}
              helperText={fieldErrors.password}
              error={Boolean(fieldErrors.password)}
              required
            />
            {error && (
              <Typography color="error" variant="body2" gutterBottom>
                {error}
              </Typography>
            )}
            <Box mt={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit">
                Войти
              </Button>
            </Box>
          </form>
          <Box mt={2} textAlign="center">
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleRegistrationClick}>
              Регистрация
            </Button>
          </Box>
          <Box mt={2} textAlign="center">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleYandexLogin}>
              Войти через Яндекс
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
