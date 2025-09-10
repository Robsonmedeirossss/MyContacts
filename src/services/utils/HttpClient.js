import delay from "../../utils/delay";
import APIError from '../../errors/APIError';

class HttpClient{
    
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }

    get(path, options){
        return this.makeRequest(path, {
            method: 'GET',
            headers: options?.headers
        })
    }

    post(path, options){
        return this.makeRequest(path, {
            method: 'POST',
            body: JSON.stringify(options?.body),
            headers: options?.headers
        })
    }

    put(path, options){
        return this.makeRequest(path, {
            body: JSON.stringify(options?.body),
            method: 'PUT',
            headers: options?.headers
        })
    }

    delete(path, options){
        return this.makeRequest(path, {
            method: 'DELETE',
            headers: options?.header
        })
    }

    async makeRequest(path, options){
        
        await delay(500);

        const headers = new Headers();

        if(options.body){
            headers.append('Content-Type', 'application/json');
        }

        if(options.headers){
            Object.entries(options.headers).forEach(([key, value]) => {
                headers.append(key, value);
            })
        }

        const response = await fetch(`${this.baseUrl}${path}`, {
            method: options.method,
            body: options.body,
            headers,
        });


        const contentType = response.headers.get('Content-Type');
        let body = null;

        if(contentType?.includes('application/json')){
            body = await response.json();
        }

        if(response.ok){
            return body;
        }


        throw new APIError(response, body);    
    }

}

export default HttpClient;