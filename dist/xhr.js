export var XHR = {
    create: (key, options) => {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest(), url = key.toString(), { method, body } = options;
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 400) {
                    resolve(xhr);
                }
                else {
                    reject(xhr);
                }
            };
            xhr.onerror = function () {
                reject(xhr);
            };
            xhr.open(method, url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xhr.send(JSON.stringify(body));
        });
    },
    get: (url) => {
        return XHR.create(url, { method: "GET" });
    },
    put: (url, body) => {
        return XHR.create(url, { method: "PUT", body: body });
    },
    post: (url, body) => {
        return XHR.create(url, { method: "POST", body: body });
    },
    delete: (url) => {
        return XHR.create(url, { method: "DELETE" });
    }
};
export default XHR;
