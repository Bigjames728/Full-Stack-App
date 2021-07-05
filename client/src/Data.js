import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requireAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
    if (requireAuth) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  async getUser(username, password) { // added new parameters (username, passowrd)
    const response = await this.api(`/users`, 'GET', null, true, { username, password }); // This route requires authentication since it says true and will take in username, password
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  //Add createCourse(), updateCourse(), and deleteCourse() functions



}