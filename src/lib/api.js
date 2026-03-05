const API_BASE_URL = String(import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

function isAbsoluteUrl(value) {
  return /^https?:\/\//i.test(String(value || ''))
}

export function toApiUrl(path) {
  const normalizedPath = String(path || '').trim()
  if (!normalizedPath) return API_BASE_URL || '/'
  if (isAbsoluteUrl(normalizedPath)) return normalizedPath
  const safePath = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`
  if (!API_BASE_URL) return safePath
  return `${API_BASE_URL}${safePath}`
}

export async function getJson(path, options = {}) {
  const response = await fetch(toApiUrl(path), {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.headers || {}),
    },
  })

  if (!response.ok) {
    let message = `Request failed (${response.status})`
    try {
      const errorBody = await response.json()
      if (typeof errorBody?.message === 'string' && errorBody.message.trim()) {
        message = errorBody.message
      }
    } catch {
      // Keep default message if response body is not JSON.
    }
    throw new Error(message)
  }

  return response.json()
}

export async function postJson(path, body, options = {}) {
  const response = await fetch(toApiUrl(path), {
    method: 'POST',
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: JSON.stringify(body ?? {}),
  })

  if (!response.ok) {
    let message = `Request failed (${response.status})`
    try {
      const errorBody = await response.json()
      if (typeof errorBody?.message === 'string' && errorBody.message.trim()) {
        message = errorBody.message
      }
    } catch {
      // Keep default message if response body is not JSON.
    }
    throw new Error(message)
  }

  return response.json()
}

export function resolveAssetUrl(path) {
  const value = String(path || '').trim()
  if (!value) return ''
  if (isAbsoluteUrl(value)) return value
  if (value.startsWith('data:')) return value
  if (value.startsWith('/')) return toApiUrl(value)
  return value
}
