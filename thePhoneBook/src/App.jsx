import { useState, useEffect } from 'react'
import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'
import axios from 'axios'
import server from './service/server'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState({message : null, tyåe: ''});

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
        setNotification({ message: `Added '${newName}'`, type: 'success' });
        setTimeout(() => setNotification({ message: null, type: '' }), 5000);
        setNewName('');
        setNewPhone('');
      })
      .catch(error => {
        setNotification({ message: 'Failed to add person.', type: 'error' });
      });
  }
};

const deletePerson = (id) => {
  const confirm = window.confirm('You sure about this?');
  if (!confirm) {
    return;
  }

  server.deletePhone(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id));
      setNotification({ message: 'Person deleted successfully.', type: 'success' });
      setTimeout(() => setNotification({ message: null, type: '' }), 5000);
    })
    .catch(error => {
      setNotification({ message: 'Failed to delete person. They may have already been removed.', type: 'error' });
      server.getAll().then(updatedPersons => setPersons(updatedPersons));
    });
};

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
      <Notification message={notification.message} type={notification.type} />
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>
      <h3>Add New</h3>
      <PersonForm addName={addName} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} newPhone={newPhone} newName={newName}/>
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson}/> 
    </div>
  )
}

export default App