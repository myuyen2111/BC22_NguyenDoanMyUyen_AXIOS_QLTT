function Services() {
  this.fetchData = function () {
    return axios({
      url: `https://6269323af2c0cdabac0b0334.mockapi.io/api/users`,
      method: "GET",
    });
  };
  this.addUserAPI = function (user) {
    return axios({
      url: `https://6269323af2c0cdabac0b0334.mockapi.io/api/users`,
      method: "POST",
      data: user,
    });
  };
  this.deleteUserAPI=function(id){
      return axios({
          url:`https://6269323af2c0cdabac0b0334.mockapi.io/api/users/${id}`,
          method:"DELETE",
      })
  }
  this.getUserbyID=function(id){
      return axios({
          url:`https://6269323af2c0cdabac0b0334.mockapi.io/api/users/${id}`,
          method:"GET",
      })
  }
  this.updateUserAPI=function(user){
      return axios({
          url:`https://6269323af2c0cdabac0b0334.mockapi.io/api/users/${user.id}`,
          method:"PUT",
        data:user,
      })
  }
}
