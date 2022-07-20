import { useState } from 'react'
import Input from './Input'

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

export default NewPersonForm
