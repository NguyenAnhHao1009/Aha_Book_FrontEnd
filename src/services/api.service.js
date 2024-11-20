import axios from 'axios'

const commonConfig = {
  header: {
    ContentType: 'application/json',
    Accept: 'Application/json',
  },
}

export default baseURL => {
  return axios.create({
    baseURL,
    ...commonConfig,
  })
}
