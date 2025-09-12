import HttpClient from "./utils/HttpClient";

import ContactMapper from "./Mapper/ContactMapper";

class ContactsService{

    constructor(){
        this.httpClient = new HttpClient('http://localhost:3001')
    }

    async listContacts(orderBy = 'asc'){

        const { contacts } = await this.httpClient.get(`/contacts?orderBy=${orderBy}`);

        return contacts.map(ContactMapper.toDomain);
    }

    async getContactById(id){
        const { contact } =  await this.httpClient.get(`/contacts/${id}`);

        return ContactMapper.toDomain(contact);
    }

    createContact(contact){
        const body = ContactMapper.toPersistent(contact)
        return this.httpClient.post('/contacts', {
            body,
            headers: {
                Authorization: 'meutoken'
            }
        });
    }

    async updateContactById(contact, id){
        const body = ContactMapper.toPersistent(contact);
        const { contactUpdated } = await this.httpClient.put(`/contacts/${id}`, { body });

        return ContactMapper.toDomain(contactUpdated);
    }

    deleteContactById(id){
        return this.httpClient.delete(`/contacts/${id}`)
    }
}

export default new ContactsService();