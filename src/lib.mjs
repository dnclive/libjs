/**
 * Usefull utils
 * @module
 */

//import isEqual from "lodash"

export function rFact(num)
{
    if (num === 0)
    { return 1; }
    else
    { return num * rFact( num - 1 ); }
}

export function sFact(num)
{
    let rval=1
    for (let i = 2; i <= num; i++)
        rval = rval * i
    return rval
}

export function seqSum(a1, d, n) {
    return ((2*a1+d*(n-1))/2)*n
}

export function rectIntersect (r1, r2) {
    if (!(r1.dx[0]<r2.dx[1]&&r2.dx[0]<r1.dx[1]
        &&r1.dy[0]<r2.dy[1]&&r2.dy[0]<r1.dy[1])) {
        return true
    }
    return false
}

/**
 * Search all indexes for which condition function is return true
 * @param arr       array to search
 * @param f         resolve function
 * @return {*[]}    found indexes array
 */

export function getAllIndexes(arr, f) {
    const indexes = []
    for(let i = 0; i < arr.length; i++) {
        if (f(arr[i], i)) indexes.push(i)
    }
    return indexes
}

/**
 * Remove duplicates items by key
 * @param arr       array to search
 * @param f         key extraction function
 * @return {*[]}    unique array
 */

export function uniqBy(arr, f) {
    let seen = new Set()
    return a.filter(item => {
        let k = key(item)
        return seen.has(k) ? false : seen.add(k)
    });
}

// *** Deep MEMO ***

/*export const deepMemo = ({store, key, item, data}) => {
    if (!store) return undefined
    if (item?.i !== undefined && data !== undefined) {
        const item = store[item.i]
        if (item !== undefined) {
            item.data = data
            return item
        }
    }
    if (key !== undefined) {
        const memo = store.filter(item => {
            return isEqual(key, item.key)
        })
        if (memo) {
            if (data !== undefined) {
                memo.data = data
            }
            return memo
        }
        const newMemo = {key, i:store.length, data}
        store.push(newMemo)
        return newMemo
    }
}*/

// await-async timeout
// await timeout(1000)
export const timeout = m => new Promise(r => setTimeout(r, m))
const fTimeout = timeout

// goto timeout
export const goto = (f, timeout) => f||setTimeout(f, 5000, goto)

export const repeater = timeout => {const repeat = f => f&&setTimeout(f, timeout, repeat); return repeat}

export const waiter = timeout => {const wait = async f => {
    await fTimeout(timeout)
    await f(wait)
    //f && setTimeout(f, timeout, repeat)
}}

export const waitFor = async timeout => new Promise(r => setTimeout(()=>r(), timeout))
export const waitWhen = (promise) => {

}

export const wait = timeout => (async () => {
    await fTimeout (timeout)
})()

// true round
export const round = (num, dec) =>
    Math.round((num + Number.EPSILON) * 10**dec) / 10**dec

export const toFixed = (num, dec=0) =>
    dec===0? parseFloat(num.toFixed()): parseFloat(num.toFixed(dec))

export const toPercents = (part, total) =>
    parseFloat(((part / total)*100).toFixed(2))

// filters
export const applyAndFilter = (item, filters) => {
    return (filters??[]).reduce((eq, f) => {
        if (Array.isArray(f.val)) {
            return eq && f.val.includes(item[f.key])
        } else {
            return eq && (item[f.key] === f.val)
        }
    }, true)
}

// await catch
export const until = promise => {
    return promise
        .then(data => [null, data])
        .catch(err => [err])
}

export const timeDiffS = time => {
    return ((new Date()).getTime() - time.getTime()) / 1000
}

export const timeDiffMs = time => {
    return ((new Date()).getTime() - time.getTime())
}

Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
}

export const addDays = (date, days) => {
    const result = new Date(date)
    result.setDate(result.getUTCDate() + days)
    return result
}

export const addDaysToTimestamp = (timestamp, days) => {
    //const result = new Date(date)
    //result.setDate(result.getUTCDate() + days)
    return timestamp + (24*60*60*1000)*days
}

export const addDaysToDate = (date, days) => {
    //const result = new Date(date)
    date.setUTCDate(date.getUTCDate() + days)
    return date
}

export const dateDiffInDays = (future, past) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(past.getFullYear(), past.getMonth(), past.getDate())
    const utc2 = Date.UTC(future.getFullYear(), future.getMonth(), future.getDate())
    return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}

export const utcTodayTimestamp = () => {
    let today = new Date()
    return Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(),
        0, 0, 0, 0)
}
export const utcNowTimestamp = () => {
    let today = new Date()
    return Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(),
        today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds(), today.getUTCMilliseconds())
}

export const utcTodayDate = () => {
    return new Date(utcTodayTimestamp())
}

export const hexToBytes = (hexStr) => {
    let bytes = []
    for (let c = 0; c < hexStr.length; c += 2)
        bytes.push(parseInt(hexStr.substr(c, 2), 16))
    return bytes
}

export const reverseStr = (s) => {
    return s.split(/(?:)/u).reverse().join("")
}

export const fUTSS =  (offset=0, base = utcNowTimestamp()) => {
    //const timeNow = utcNowTimestamp()
    //const timeOffset = base - base%300000 - 300000*offset
    //log("fUTSS", new Date(base), new Date(timeOffset))
    //return timeOffset
    return base - base%300000 - 300000*offset
}

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}