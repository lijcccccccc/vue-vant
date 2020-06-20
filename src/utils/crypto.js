import { map } from 'lodash'

export function getHash(text, num = 1) {
    if (text) {
        const byteArray = text.split('')
        return map(byteArray, item => String.fromCharCode(item.charCodeAt() + num)).join('')
    }
    return text
}
