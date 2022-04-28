function Services() {
    this.fetchData = function () {
      return axios({
        url: "https://6269323af2c0cdabac0b0334.mockapi.io/api/users",
        method: "GET",
      });
    };
  }
  