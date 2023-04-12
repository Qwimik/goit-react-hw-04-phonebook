import { useState, useEffect } from 'react';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

import { Container, Title, SubTitle } from 'components/App/App.styled';

const LS_KEY = 'contacts';
const testContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const [contacts, setContacts] = useState(() =>
    localStorage.getItem(LS_KEY)
      ? JSON.parse(localStorage.getItem(LS_KEY))
      : testContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem(LS_KEY));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const names = contacts.map(item => item.name);

    if (names.some(name => name.toLowerCase() === contact.name.toLowerCase())) {
      alert(`${contact.name} is already in contacts.`);
    } else {
      setContacts([...contacts, contact]);
    }
  };

  const deleteContact = contactName => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.name !== contactName)
    );
  };

  const filterContacts = value => {
    setFilter(value);
  };

  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.includes(filter)
  );

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm addContact={addContact} />
      <SubTitle>Contacts</SubTitle>
      <Filter filter={filter} filterContacts={filterContacts} />
      {contacts.length > 0 ? (
        <ContactList
          contacts={filteredContacts}
          deleteContact={deleteContact}
        />
      ) : (
        <p style={{ textAlign: 'center' }}>Don't have contacts...</p>
      )}
    </Container>
  );
}
