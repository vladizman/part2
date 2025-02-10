import { useState, useEffect } from 'react'
import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'
import axios from 'axios'
import server from './service/server'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
     server
    .getAll()
    .then(initResponse => {
      setPersons(initResponse)
      console.log(initResponse)
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
        number: newPhone
      };
      server
      .create(personObject)
      .then(returnedResponse => {
        setPersons(persons.concat(returnedResponse));
        setNewName('');
        setNewPhone('');
      })
       
    }    
  }

  const deletePerson = (id) => {

    const confirm = window.confirm('You sure about this?')

    if (!confirm){
      return;
    }

    console.log(id)
    server.deletePhone(id)
    .then( () => {  
      setPersons(persons.filter(person => person.id !== id));
    }
     )
  }

  const handleNameChange = (event) => {
     setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
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
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson}/> 
    </div>
  )
}

export default App