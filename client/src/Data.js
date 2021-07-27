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
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  async getUser(emailAddress, password) { // added new parameters (emailAddress, passowrd)
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password }); // This route requires authentication since it says true and will take in emailAddress, password
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

  //Add api methods - keep in data file

  // Get all courses
  async getCourses() {
    const response = await this.api('/courses', 'GET', null);
    if (response.status === 200) {
      return response.json().then(data => data);
    } else {
      throw new Error();
    }
  }

  // Get specific course
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET', null);
    if (response.status === 200) {
      return response.json().then(data => data);
    } else {
      throw new Error();
    }
  }


  //Add createCourse(), updateCourse(), and deleteCourse() functions

  //Create a new course
  async createCourse(course, emailAddress, password) {
    console.log(course, emailAddress, password);
    const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });

    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data;
      });
    } else {
      throw new Error();
    }
  }

  //Update a course
  async updateCourse(course, emailAddress, password) {
    const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, { emailAddress, password });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data;
      });
    } else {
      throw new Error();
    }
  }

  //Delete a course
  async deleteCourse(course, emailAddress, password) {
    const response = await this.api(`/courses/${course.id}`, 'DELETE', null, true, { emailAddress, password });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data;
      });
    } else {
      throw new Error();
    }
  }
}