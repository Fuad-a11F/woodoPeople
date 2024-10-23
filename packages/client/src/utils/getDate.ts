export default function getDate() {
  const today = new Date()

  const day = String(today.getDate()).padStart(2, '0')
  const month = String(today.getMonth() + 1).padStart(2, '0') // Месяцы в JavaScript начинаются с 0
  const year = today.getFullYear()

  const formattedDate = `${day}.${month}.${year}`

  return formattedDate
}