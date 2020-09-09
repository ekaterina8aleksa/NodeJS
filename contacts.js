const fs = require("fs").promises;
const path = require("path");

class Contacts {
    constructor() {
        this.FILE_CONTACTS_PATH = path.resolve(
            __dirname,
            "db",
            "contacts.json"
        );
    }
    listContacts = async () => {
        try {
            const contactsData = await fs.readFile(this.FILE_CONTACTS_PATH, {
                encoding: "utf-8",
            });
            return JSON.parse(contactsData);
        } catch (err) {
            console.log("Error geting contacts", err);
        }
    };

    getContactById = async (contactId) => {
        try {
            const contactsData = await this.listContacts();
            return contactsData.find((contact) => contact.id === contactId);
        } catch (err) {
            console.log(`Error finding contact with id ${contactId}`, err);
        }
    };

    addContact = async (name, email, phone) => {
        try {
            const contactsData = await this.listContacts();
            const id = contactsData.length ? [...contactsData].pop().id + 1 : 1; //or contactsData.length + 1
            const newContact = { id, name, email, phone };
            await contactsData.push(newContact);
            const contactsDataJson = JSON.stringify(contactsData);
            fs.writeFile(this.FILE_CONTACTS_PATH, contactsDataJson);
            return newContact;
        } catch (err) {
            console.log("Error adding new contact", err);
        }
    };
    removeContact = async (contactId) => {
        try {
            const contactsData = await this.listContacts();
            const result = await contactsData.filter(
                (contact) => contact.id !== contactId
            );
            fs.writeFile(this.FILE_CONTACTS_PATH, JSON.stringify(result));
            return result;
        } catch (err) {
            console.log(`Error deleting contact with id ${contactId}`, err);
        }
    };
}

module.exports = new Contacts();
