import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getContacts = () => axios.get(baseUrl).then(response => response.data)
const createContact = newContact => axios.post(baseUrl, newContact).then(response => response.data)
const deleteContact = person => axios.delete(`${baseUrl}/${person.id}`).then(response => response.data)
const changeContact = person => axios.put(`${baseUrl}/${person.id}`, person).then(response => response.data)

export default { getContacts, createContact, deleteContact, changeContact }