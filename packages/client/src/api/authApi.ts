import fetchWithConfig from './apiConfig'

const API_URL = 'https://ya-praktikum.tech/api/v2'
export const YA_AUTH_URL = 'https://local.ya-praktikum.tech'

/**
 * Получение Service ID для авторизации через Яндекс
 */
export const getServiceId = async (redirectUri: string): Promise<string> => {
  return fetchWithConfig<{ service_id: string }>(
    `${API_URL}/oauth/yandex/service-id?redirect_uri=${encodeURIComponent(
      redirectUri
    )}`,
    {
      method: 'GET',
    }
  ).then(data => data.service_id)
}

/**
 * Обмен кода на токен авторизации через Яндекс
 */
export const exchangeOAuthCodeForToken = async (
  code: string
): Promise<void> => {
  return fetchWithConfig<void>(`${API_URL}/oauth/yandex`, {
    method: 'POST',
    data: { code, redirect_uri: YA_AUTH_URL },
  })
}
