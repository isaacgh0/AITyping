import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  organization: 'org-x4FSj2Xa8dKz4rHdQAwgxC7o',
  apiKey: process.env.REACT_APP_OPENIA_API_KEY
})

const openai = new OpenAIApi(configuration)

export default openai
