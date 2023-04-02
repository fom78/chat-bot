import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

function Chat({ answers, examples, apiKey, inicialMensaje }) {

  const [mensajes, setMensajes] = useState([
    {
      id: "1",
      type: "bot",
      text: inicialMensaje
    }
  ])

  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const container = useRef(null)
  const [isCollapsed, toggleColapsed] = useState(true)



  async function handleSubmit(event) {
    event.preventDefault()

    if (question === "") return
    if (loading) return // Evita enviar multiples preguntas

    setQuestion("")
    setLoading(true)
    setMensajes((mensajes) => mensajes.concat({ id: Date.now(), type: "user", text: question }))

    const { classifications } = await fetch("https://api.cohere.ai/v1/classify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "large",
        inputs: [question],
        examples: examples
      })
    }).then(res => res.json())

    setLoading(false)

    setMensajes((mensajes) => mensajes.concat({ id: Date.now(), type: "bot", text: answers[classifications[0].prediction] || answers["desconocidas"] }))


  }

  useEffect(() => {
    container.current?.scrollTo(0, container.current.scrollHeight)
  }, [mensajes, isCollapsed])


  return createPortal(

    <div className="fixed bottom-8 right-8">
      {isCollapsed ? (
        <button
        className="text-xl rounded-full bg-blue-800 w-8 h-8 absolute -left-4 -top-2"
          onClick={() => toggleColapsed(false)}
        >
          ?
        </button>
      )
        : (
          <div>
            <button
            className="text-xl rounded-full bg-blue-800 w-8 h-8 absolute -left-4 -top-2"
              onClick={()=> toggleColapsed(true)}
            >×</button>
            <div className="flex flex-col gap-4 m-auto max-w-lg border border-gray-400 p-4 rounded-md  bg-slate-800 ">
              <div ref={container} className="flex flex-col gap-4 h-[300px] overflow-y-auto">
                {mensajes.map((mensaje) => (
                  <div key={mensaje.id} className={`p-4 max-w-[80%] rounded-3xl text-white ${mensaje.type === "bot" ? "bg-slate-500 text-left self-start rounded-bl-none" : "bg-blue-500 text-right self-end rounded-br-none"}`}>{mensaje.text}</div>
                ))}
              </div>
              <form className="flex items-center" onSubmit={handleSubmit}>
                <input
                  className="rounded rounded-r-none flex-1 border border-gray-400 py-2 px-4 bg-inherit"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  type="text"
                  placeholder="Quien sos ?"
                  name="question"
                />
                <button
                  disabled={loading}
                  className={`px-4 py-2  rounded-lg ${loading ? "bg-blue-300" : "bg-blue-500"}`}
                  type="submit">
                  ↩
                </button>
              </form>
            </div>
          </div>
        )}
    </div>, document.getElementById("chat")

  )
}

export default Chat
