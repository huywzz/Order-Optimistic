const _=require('lodash')

const getInforData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields)
}

const convertStringToNumber = (str) => {
    const temp = str.split('.').join('')
    return parseInt(temp)
}
module.exports = {
    getInforData,
    convertStringToNumber
}