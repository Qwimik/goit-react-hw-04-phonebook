import { Component } from 'react';
import PropTypes from 'prop-types';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

import { Container, Title, SubTitle } from 'components/App/App.styled';

const LS_KEY = 'contacts';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    if (JSON.parse(localStorage.getItem(LS_KEY))) {
      this.setState({ contacts: JSON.parse(localStorage.getItem(LS_KEY)) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  addContact = contact => {
    const names = this.state.contacts.map(item => item.name);

    if (names.some(name => name.toLowerCase() === contact.name.toLowerCase())) {
      alert(`${contact.name} is already in contacts.`);
    } else {
      this.setState({ contacts: [...this.state.contacts, contact] });
    }
  };

  deleteContact = contact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.name !== contact),
    }));
  };

  filterContacts = value => {
    this.setState({ filter: value });
  };

  render() {
    const { filter } = this.state;

    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm addContact={this.addContact} filter={this.state.filter} />
        <SubTitle>Contacts</SubTitle>
        <Filter
          filter={this.state.filter}
          filterContacts={this.filterContacts}
        />
        {this.state.contacts.length > 0 ? (
          <ContactList
            contacts={filteredContacts}
            deleteContact={this.deleteContact}
          />
        ) : (
          <p style={{ textAlign: 'center' }}>Don't have contacts...</p>
        )}
      </Container>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  filter: PropTypes.string,
};
