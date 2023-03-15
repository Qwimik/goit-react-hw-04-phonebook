import { ContactListItems } from 'components/ContactList/ContactListItems';

import { ContactUl } from 'components/ContactList/ContactList.styled';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ContactUl>
      <ContactListItems contacts={contacts} deleteContact={deleteContact} />
    </ContactUl>
  );
};
