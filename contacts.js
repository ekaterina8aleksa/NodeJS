const fs = require("fs").promises;
const path = require("path");

class Contacts {
    constructor() {
        this.fileContactsPath = path.resolve(__dirname, "db", "contacts.json");
    }
    listContacts = async () => {
        try {
            const contactsData = await fs.readFile(this.fileContactsPath, {
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
            contactsData.push(newContact);
            const contactsDataJson = JSON.stringify(contactsData);
            fs.writeFile(this.fileContactsPath, contactsDataJson);
            return newContact;
        } catch (err) {
            console.log("Error adding new contact", err);
        }
    };
    removeContact = async (contactId) => {
        try {
            const contactsData = await this.listContacts();
            const result = contactsData.filter(
                (contact) => contact.id !== contactId
            );
            fs.writeFile(this.fileContactsPath, JSON.stringify(result));
            return result;
        } catch (err) {
            console.log(`Error deleting contact with id ${contactId}`, err);
        }
    };
}

module.exports = new Contacts();
