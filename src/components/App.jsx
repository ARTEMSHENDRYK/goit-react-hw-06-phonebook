import { nanoid } from "nanoid";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import css from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "redux/filter/slice";
import { addContact, deleteContact } from "redux/contacts/slice";

function App() {
  const filter = useSelector(state => state.filter.query);
  const contacts = useSelector(state => state.storage.contacts);
  const dispatch = useDispatch();

  function handleSubmit(name, number) {
  
    if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact({ id: nanoid(), name: name, number: number }));
  }

  function handleFilter(evt) {
    dispatch(setFilter(evt.target.value))
  }

  function filterContacts() {
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
  }

  function handleDelete(id) {
    dispatch(deleteContact({ id: id }));
  }

  return (
    <div>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onAddContact={handleSubmit}/>
      <h2 className={css.title}>Contacts</h2>
      <Filter
        filter={filter}
        onFilter={handleFilter}
      />
      {contacts.length > 0
        ? (
          <ContactList
              contacts={filterContacts()} onDelete={handleDelete}/>
        )
        : (<p className={css.title}>There are no contacts.</p>)    
      }
    </div>
  );
}  

export default App;