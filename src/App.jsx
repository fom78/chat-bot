import Chat from "./components/Chat"

const EXAMPLES = [{ "text": "Hola", "label": "intro" }, { "text": "Como estas", "label": "intro" }, { "text": "Quien sos", "label": "intro" }, { "text": "Por donde te puedo contactar?", "label": "contact" }, { "text": "Tengo una duda", "label": "comunidad" }, { "text": "Tengo un trabajo para vos", "label": "intro" }, { "text": "Estas buscando trabajo?", "label": "intro" }, { "text": "Donde trabajas ?", "label": "intro" }, { "text": "Con que tecnologias trabajas?", "label": "intro" }, { "text": "Estas escuchando ofertas?", "label": "intro" }, { "text": "Con que tecnologias tenes experiencia?", "label": "intro" }, { "text": "Cuantos años de experiencia tenes?", "label": "intro" }, { "text": "Te interesa cambiar de trabajo?", "label": "intro" }, { "text": "Como es tu linkedin?", "label": "contact" }, { "text": "Como es tu github?", "label": "contact" }, { "text": "Como aprender a programar?", "label": "comunidad" }, { "text": "Tenes tutoriales?", "label": "comunidad" }, { "text": "Cuales son tus redes?", "label": "contact" }, { "text": "Que edad tienen tus mascotas?", "label": "desconocidas" }, { "text": "team marval o dc?", "label": "desconocidas" }]

const API_KEY = "5Ti9DHVqyXQVoFru3qlIc8hrnHa2MbFYb5jM5Tgj"

const ANSWERS = {
  desconocidas: (
    <p> Soy un bot, creado con IA, si estas leyendo este mensaje te sugiero reformules la pregunta y seguro podre darte la repuesta que estas esperando. Gracias che!</p>
  ),
  intro: (
    <p>
      Hola!!! Soy Fernando Masino, desarrollador web, mi stack favorito es el <b>MERN</b> pero me adapto a realizar soluciones con lo que me sugieran si esta a mi alcance, Ademas soy Docente del programa Codo a Codo 4.0 ....
    </p>
  ),
  contact: (
    <div>
      <h1>Mis redes</h1>
      <p>Te dejo mis redes donde podes encontrarme</p>
      <ul>
        <li>Linkedin: </li>
        <li>Youtube: </li>

      </ul>
    </div>
  )
}
function App() {
  
  return (
    <main className="p-4">
      <Chat answers={ANSWERS} examples={EXAMPLES} apiKey={API_KEY} inicialMensaje={"Hola, haceme tu pregunta."}  />
    </main>
  )
}

export default App
