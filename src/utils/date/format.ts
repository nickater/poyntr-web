import dayjs from 'dayjs'

export const formatDateTime = (date: string) => {
  return dayjs(date).format('DD MMM - h:mm A')
}