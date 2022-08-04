import { useState, useEffect } from 'react'

import Input from './components/Input'
import NewPersonForm from './components/NewPersonForm'
import Contacts from './components/Contacts'
import Notification from './components/Notification'

import ContactService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [alertNote, setAlertNote] = useState({ message: '', type: '' });

  useEffect(() => {
    ContactService
      .getContacts()
      .then(persons => { setPersons(persons) })
  }, [])

  const [searchName, setSearchName] = useState('')
  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
  }

  const handleDelete = person => () => {
    if (window.confirm(`Really delete ${person.name} from the phonebook?`)) {
      ContactService
        .deleteContact(person)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setAlertNote({
            message: `${person.name} has been deleted`,
            type: 'success'
          })
          setTimeout(() => {
            setAlertNote({ message: '', type: '' })
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Input text="search" value={searchName} onChange={handleSearchNameChange} />
      <Notification message={alertNote.message} type={alertNote.type} />

      <h3>Add a new contact</h3>
      <NewPersonForm persons={persons} setPersons={setPersons} setAlertNote={setAlertNote} />

      <h3>Contacts</h3>
      <Contacts persons={persons} filter={searchName} handleDelete={handleDelete} />
    </div>
  )
}

export default App
