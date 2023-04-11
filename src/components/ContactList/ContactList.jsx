import PropTypes from 'prop-types';

import { ContactListItems } from 'components/ContactListItems/ContactListItems';
import { ContactUl } from 'components/ContactList/ContactList.styled';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ContactUl>
      <ContactListItems contacts={contacts} deleteContact={deleteContact} />
    </ContactUl>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
