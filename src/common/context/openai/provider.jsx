import OpenAIContext from './context'
import openai from './openai'

const OpenAIProvider = ({ children }) => {
  return (
    <OpenAIContext.Provider value={{ openai }}>
      {children}
    </OpenAIContext.Provider>
  )
}

export default OpenAIProvider
