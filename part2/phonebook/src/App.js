import { useState } from 'react'

const Input = ({text, value, onChange}) => <div>{text}: <input value={value} onChange={onChange} /></div>

const NewPersonForm = ({persons, setPersons}) => {
  const dummy = {name: '', number: ''}

  const [newPerson, setNewPerson] = useState(dummy)
  const handleNameChange = (event) => setNewPerson({...newPerson, name: event.target.value})
  const handleNumberChange = (event) => setNewPerson({...newPerson, number: event.target.value})

  const checkName = (name) => persons.some(person => person.name === name)

  const addName = (event) => {
    if (checkName(newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`)
      event.preventDefault()
      return
    }
    event.preventDefault()
    setPersons(persons.concat({...newPerson, id: persons.length + 1}))
    setNewPerson(dummy);
  }
  return (
    <>
      <form onSubmit={addName}>
        <Input text="name" value={newPerson.name} onChange={handleNameChange}/>
        <Input text="number" value={newPerson.number} onChange={handleNumberChange}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Contacts = ({persons, filter}) => {
  return (
    <>
      <ul>
        {filter === '' ?
          persons.map(person => <li key={person.id}>{person.name}: {person.number}</li>) :
          persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <li key={person.id}>{person.name}: {person.number}</li>)
                    }
      </ul>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

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
