import { useState } from 'react'
import Input from './Input'

import ContactService from '../services/contacts'

const NewPersonForm = ({ persons, setPersons, setAlertNote }) => {
  const dummy = { name: '', number: '' }

  const [newPerson, setNewPerson] = useState(dummy)
  const handleNameChange = event => setNewPerson({ ...newPerson, name: event.target.value })
  const handleNumberChange = event => setNewPerson({ ...newPerson, number: event.target.value })

  const checkName = name => persons.some(person => person.name === name)

  const addName = event => {
    if (checkName(newPerson.name)) {
      if (window.confirm(`${newPerson.name} is already in the phonebook, change the number?`)) {
        ContactService
          .changeContact({ ...newPerson, id: persons.find(person => person.name === newPerson.name).id })
          .then(() => {
            setPersons(persons.map(person => person.name === newPerson.name ? { ...person, number: newPerson.number } : person))
            setAlertNote({
              message: `${newPerson.name} contact has been changed`,
              type: 'success'
            })
            setTimeout(() => {
              setAlertNote({ message: '', type: '' })
            }, 5000)
          })
          .catch(() => {
            setAlertNote({
              message: `${newPerson.name} does not exist`,
              type: 'error'
            })
            setTimeout(() => {
              setAlertNote({ message: '', type: '' })
            }, 5000)
          })
      }
      event.preventDefault()
      return
    }
    event.preventDefault()
    ContactService
      .createContact(newPerson)
      .then(person => {
        setPersons(persons.concat({ ...person }))
        setAlertNote({
          message: `${person.name} has been added`,
          type: 'success'
        })
        setTimeout(() => {
          setAlertNote({ message: '', type: '' })
        }, 5000)
        setNewPerson(dummy);
      })
  }
  return (
    <>
      <form onSubmit={addName}>
        <Input text="name" value={newPerson.name} onChange={handleNameChange} />
        <Input text="number" value={newPerson.number} onChange={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default NewPersonForm
