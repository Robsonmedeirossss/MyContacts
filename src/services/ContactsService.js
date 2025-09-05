import HttpClient from "./utils/HttpClient";

class ContactsService{

    constructor(){
        this.httpClient = new HttpClient('http://localhost:3001')
    }

    listContacts(orderBy = 'asc'){
       return this.httpClient.get(`/contacts?orderBy=${orderBy}`, {});
    }

    getContact(id){
        return this.httpClient.get(`/contacts/${id}`);
    }

    createContact(contact){
        return this.httpClient.post('/contacts', {
            body: contact,
            headers: {
                Authorization: 'meutoken'
            }
        });
    }
}

export default new ContactsService();