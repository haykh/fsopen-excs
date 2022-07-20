import { useState, useEffect } from 'react'
import axios from 'axios'

import Input from './components/Input'
import NewPersonForm from './components/NewPersonForm'
import Contacts from './components/Contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => { setPersons(response.data) })
  }, [])

  const [searchName, setSearchName] = useState('')
  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Input text="search" value={searchName} onChange={handleSearchNameChange}/>

      <h3>Add a new contact</h3>
      <NewPersonForm persons={persons} setPersons={setPersons}/>

      <h3>Contacts</h3>
      <Contacts persons={persons} filter={searchName}/>
    </div>
  )
}

export default App
