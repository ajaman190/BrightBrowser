class ApiManager {
    constructor(baseURL) {
      this.baseURL = baseURL;
    }
  
    async request(endpoint, method = 'GET', data = null) {
      const url = `${this.baseURL}/${endpoint}`;
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers here
        },
      };
  
      if (data) {
        options.body = JSON.stringify(data);
      }
  
      try {
        const response = await fetch(url, options);
        return response.json(); // Assuming JSON response
      } catch (error) {
        console.error('API request failed:', error);
        throw error;
      }
    }
  }
  
  // Usage:
  // const api = new ApiManager('https://your.api/baseUrl');
  // api.request('endpoint').then(data => console.log(data));
  