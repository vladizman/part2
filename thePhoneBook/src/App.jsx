import { useState, useEffect } from 'react'
import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    console.log("useEffect starts");
    axios
    .get('http://localhost:3002/persons')
    .then(response => {
      console.log(response.data)
      setPersons(response.data)
      console.log(persons)
    })
  }, [])

  const addName = (event) => {
     event.preventDefault()
     const nameExists = persons.some(person => person.name === newName);
     if (nameExists) {
      alert(`${newName} is already added to the phonebook.`);
    } else {
      const personObject = {
        name: newName,
        phone: newPhone
      };
    
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewPhone('')
    }    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
    
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>
      <h3>Add New</h3>
      <PersonForm addName={addName} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} newPhone={newPhone} newName={newName}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filteredPersons={filteredPersons}/> 
    </div>
  )
}

export default App