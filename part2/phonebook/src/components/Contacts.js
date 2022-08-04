const Contact = ({ person, handleDeletePerson }) => <li>{person.name}: {person.number} <button onClick={handleDeletePerson}>Delete</button></li>

const Contacts = ({ persons, filter, handleDelete }) => (
  <ul>{
    ((filter === '') ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())))
      .map(person => <Contact key={person.id} person={person} handleDeletePerson={handleDelete(person)}/>)
  }</ul>
)

export default Contacts
