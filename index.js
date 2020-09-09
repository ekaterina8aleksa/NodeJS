const Contacts = require("./contacts");
const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            Contacts.listContacts().then((contacts) => console.table(contacts));
            break;

        case "get":
            Contacts.getContactById(id).then((contact) =>
                console.table(contact)
            );
            break;

        case "add":
            Contacts.addContact(name, email, phone).then((contact) =>
                console.table(contact)
            );
            break;

        case "remove":
            Contacts.removeContact(id).then((contacts) =>
                console.table(contacts)
            );
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);
