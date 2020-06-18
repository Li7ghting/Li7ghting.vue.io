import http from '@/http/httpRequest'

export function getToken() {
  return http({
    url: '/auth/token',
    method: 'get'
  })
}
