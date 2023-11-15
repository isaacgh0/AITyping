import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  organization: 'org-x4FSj2Xa8dKz4rHdQAwgxC7o',
  apiKey: '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'
})

const openai = new OpenAIApi(configuration)

export default openai
