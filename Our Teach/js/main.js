function getEle(id) {
    return document.getElementById(id);
  }
  // Api
var services = new Services();
function getListTeachers() {
services.fetchData()
    .then(function (result) {
      renderHTML(result.data);
      // console.log(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getListTeachers()
function renderHTML(user_arr) {
  var content = "";
  for (var i = 0; i < user_arr.length; i++) {
    var teacher = user_arr[i];
    if (teacher.loaiND == "GV") {
      content += `<div class="col-lg-3">
                  <div class="container"></div>
                  <div class="card card member__card animate__animated animate__fadeIn">
                    <div class="thumbnail">
                      <img
                        class="card-img-top img-fluid"
                        src="../images/${teacher.hinhAnh}"
                        alt="image"
                      />
                    </div>
                    <div class="card-body">
                      <p>${teacher.ngonNgu}</p>
                      <h1 class="card-title">${teacher.hoTen}</h1>
                      <p class="card-text">
                      ${teacher.moTa}
                      </p>
                    </div>
                  </div>
              </div>`;
    }
  }
  getEle("teacher_content").innerHTML = content;
}

  