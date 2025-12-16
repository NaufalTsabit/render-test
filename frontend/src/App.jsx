import { useState, useEffect } from "react"
import Note from "./components/Note"
import noteServices from './services/notes'
import Notification from "./components/Notification"
import Footer from "./components/Footer"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNotes, setNewNotes] = useState('a new note...')
  const [show, setShow] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    noteServices
      .getAll()
      .then(initialNote => {
        setNotes(initialNote)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content:newNotes,
      important:Math.random() > 0.5
    }
    noteServices
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNotes('')
      })
  }

  const toggleImportant = id => {
    const note = notes.find(n => n.id === id)
    const changeNote = {...note, important: !note.important}

    noteServices
      .update(id, changeNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(error => {
        setErrorMessage(
          `note ${note.content} was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
    console.log('importance of ' +id+ ' is toggled')
  }
  const handleNoteChange = (event) => {
    setNewNotes(event.target.value)
  }
  const notesToShow = show 
    ? notes
    : notes.filter(note => note.important === true)
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button onClick={() => setShow(!show)}>
        show {show ? 'important':'all'}
      </button>
      <ul>
        {notesToShow.map(note =>
          <Note 
            key={note.id} 
            note={note}
            toggleImportant={() => toggleImportant(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNotes}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App