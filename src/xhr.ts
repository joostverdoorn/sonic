import { IObservable } from '../node_modules/sonic/dist/observable';
import { ISubscription, Subject } from '../node_modules/sonic/dist/observable';
import Key from '../node_modules/sonic/dist/key';

export interface XHROptions {
  method?: string,
  body?: string
}

export var XHR = {
  create: (key: Key, options: any): Promise<XMLHttpRequest> => {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest(),
          url = key.toString(),
          { method, body } = options;

      xhr.onload = function() {
        if(xhr.status >= 200 && xhr.status < 400) {
          resolve(xhr);
        } else {
          reject(xhr)
        }
      }

      xhr.onerror = function() {
        reject(xhr);
      }

      xhr.open(method, url, true);
      xhr.setRequestHeader('Content-Type', 'application/json')
      // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

      xhr.send(JSON.stringify(body));
    });
  },

  get: (url: string): Promise<XMLHttpRequest> => {
    return XHR.create(url, { method: "GET" });
  },

  put: (url: string, body: Object): Promise<XMLHttpRequest> => {
    return XHR.create(url, { method: "PUT", body: body });
  },

  post: (url: string, body: Object): Promise<XMLHttpRequest> => {
    return XHR.create(url, { method: "POST", body: body });
  },

  delete: (url: string): Promise<XMLHttpRequest> => {
    return XHR.create(url, { method: "DELETE" });
  }
}

export default XHR;
