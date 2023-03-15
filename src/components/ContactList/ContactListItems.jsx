import {
  ContactLi,
  ContactBtn,
} from 'components/ContactList/ContactList.styled';
import { FaWindowClose } from 'react-icons/fa';

export const ContactListItems = ({ contacts, deleteContact }) => {
  return contacts.map(item => {
    return (
      <ContactLi key={item.name}>
        <span>
          {item.name}: {item.number}
        </span>
        <ContactBtn type="button" onClick={() => deleteContact(item.name)}>
          <FaWindowClose />
        </ContactBtn>
      </ContactLi>
    );
  });
};
