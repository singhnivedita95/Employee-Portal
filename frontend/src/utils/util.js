import moment from 'moment';

export const prepareDate = (date) => {
    return moment(date.split('T')[0]).format('DD MMM YYYY')
} 