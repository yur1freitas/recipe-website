'use strict'

const ContentTypes = Object.freeze({
    JSON: 'application/json',
    TEXT: 'text/plain'
})

/**
 * @param {Response} response
 * @returns {Promise<unknown>}
 */
const parseResponse = async (response) => {
    const contentType = response.headers.get('Content-Type')

    if (contentType?.startsWith(ContentTypes.JSON)) {
        return response.json()
    }

    if (contentType?.startsWith(ContentTypes.TEXT)) {
        return response.text()
    }

    return null
}

/**
 * @template T
 * @typedef SuccessResponse
 * @prop {true} success
 * @prop {T} data
 * @prop {null} error
 */

/**
 * @typedef FailedResponse
 * @prop {false} success
 * @prop {null} data
 * @prop {HttpError} error
 */

/**
 * @template T
 * @typedef HttpResponse
 * @type {(SuccessResponse<T> | FailedResponse) & { response: Response }}
 */

/**
 * @template T
 * @param {string} path
 * @param {RequestInit} options
 * @return {Promise<HttpResponse<T>>}
 */
const request = async (path, options) => {
    const response = await fetch(path, options)

    const clonedResponse = response.clone()
    const data = await parseResponse(response)

    if (response.ok) {
        return {
            data,
            error: null,
            success: true,
            response: clonedResponse
        }
    }

    return {
        data: null,
        error: data,
        success: false,
        response: clonedResponse
    }
}

/**
 * @template T
 * @param {string} path
 * @param {Omit<RequestInit, 'method'>} options
 * @return {Promise<HttpResponse<T>>}
 */
export const GET = async (path, options) => {
    return request(path, { method: 'GET', ...options })
}

/**
 * @template T
 * @param {string} path
 * @param {Omit<RequestInit, 'method'>} options
 * @return {Promise<HttpResponse<T>>}
 */
export const POST = async (path, options) => {
    return request(path, { method: 'POST', ...options })
}

/**
 * @template T
 * @param {string} path
 * @param {Omit<RequestInit, 'method'>} options
 * @return {Promise<HttpResponse<T>>}
 */
export const PUT = async (path, options) => {
    return request(path, { method: 'PUT', ...options })
}

/**
 * @template T
 * @param {string} path
 * @param {Omit<RequestInit, 'method'>} options
 * @return {Promise<HttpResponse<T>>}
 */
export const DELETE = async (path, options) => {
    return request(path, { method: 'DELETE', ...options })
}
