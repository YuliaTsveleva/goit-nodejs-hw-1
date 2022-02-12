const contactsOperations = require("./contacts");
// const argv = require("yargs").argv;

// TODO: рефакторить
async function invokeAction({ action, id, data }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`Contact witn ${id} not found`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsOperations.addContact(data);
      console.log(newContact);
      break;

    case "update":
      const updatedContact = await contactsOperations.updateContactById(
        id,
        data
      );
      if (!updatedContact) {
        throw new Error(`Contact witn ${id} not found`);
      }
      console.log(updatedContact);
      break;

    case "remove":
      const removedContact = await contactsOperations.removeContact(id);
      console.log(removedContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction(argv);

// const newData = {
//   name: "Sherlock Holmes",
//   email: "baker-street@gmail.com",
//   phone: "(111) 111-1111",
// };

// const updateId = "Dw-8nhp-R24AhF3qp6lYi";
// const updatedData = {
//   name: "Sherlock Holmes",
//   email: "baker-street-221b@gmail.com",
//   phone: "(222) 222-2222",
// };

const removeId = "Dw-8nhp-R24AhF3qp6lYi";

invokeAction({ action: "remove", id: removeId });
