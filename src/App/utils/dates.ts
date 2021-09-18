import moment from 'moment'

const now = moment()

export const weekStart = now.clone().startOf('isoWeek')
export const weekEnd = now.clone().endOf('isoWeek')
