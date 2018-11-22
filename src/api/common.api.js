import $http from '@/utils/axios'

export const getDateInfo = ({
  data = {}
}) => $http.post({
  url: '/v2/launches',
  data
})