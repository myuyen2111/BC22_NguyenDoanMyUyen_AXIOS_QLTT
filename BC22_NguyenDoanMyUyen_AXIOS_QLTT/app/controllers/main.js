function getEle(id) {
  return document.getElementById(id);
}
var services = new Services();
var validation = new Validation();
//Valid & lấy thông tin
function checkValid(
  account,
  fullname,
  password,
  email,
  photo,
  typeUser,
  language,
  description
) {
  //flag
  var isValid = true;
  //lấy số người dùng hiện có
  var ID_shown=document.getElementsByClassName("getId").length;
  //validation tài khoản
  isValid &= validation.checkNull(
    account,
    "divErrorAccount",
    "(*) Tài khoản không được để trống"
  )&&
  validation.existed(account,ID_shown,"divErrorAccount","(*)Tài khoản đã bị trùng");
  //validation họ tên
  isValid &=
    validation.checkNull(
      fullname,
      "divErrorName",
      "(*) Tên không được để trống"
    ) &&
    validation.letterCheck(
      fullname,
      "divErrorName",
      "(*) Tên không được chứa số, ký tự đặc biệt"
    );
  //validation mật khẩu
  isValid &=
    validation.checkNull(
      password,
      "divErrorPassword",
      "(*) Password không được để trống"
    ) &&
    validation.lengthCheck(
      password,
      "divErrorPassword",
      "(*)Password phải có 6-8 ký tự",
      6,
      8
    ) &&
    validation.passwordCheck(
      password,
      "divErrorPassword",
      "(*) Password phải chứa 1 ký tự số, 1 ký tự in hoa và 1 ký tự đặc biệt"
    );
  //validation email
  isValid &=
    validation.checkNull(
      email,
      "divErrorEmail",
      "(*) Email không được để trống"
    ) &&
    validation.emailCheck(
      email,
      "divErrorEmail",
      "(*) Email không đúng định dạng"
    );
  //validation hình ảnh
  isValid &= validation.checkNull(
    photo,
    "divErrorPhoto",
    "(*) Hình ảnh không được để trống"
  );
  //validation loại người dùng
  isValid &= validation.selectionCheck(
    typeUser,
    "Chọn loại người dùng",
    "divErrorType",
    "(*) Vui lòng chọn"
  );
  //validation loại ngôn ngữ
  isValid &= validation.selectionCheck(
    language,
    "Chọn ngôn ngữ",
    "divErrorLanguage",
    "(*) Vui lòng chọn"
  );
  //validation mô tả
  isValid &=
    validation.checkNull(
      description,
      "divErrorDescription",
      "(*) Mô tả không được trống"
    ) &&
    validation.lengthCheck(
      description,
      "divErrorDescription",
      "(*) Mô tả không được vượt quá 60 ký tự",
      1,
      60
    );
  // check form
  if (!isValid) return null;
  
}
function getListUsers() {
  services
    .fetchData()
    .then(function (result) {
      renderHTML(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getListUsers();
function renderHTML(data) {
  var content = "";
  for (i = 0; i < data.length; i++) {
    var user = data[i];
    content += `
        <tr>
        <td class="getId">${i + 1}</td>
        <td class="taiKhoan_validation">${user.taiKhoan}</td>
        <td>${user.matKhau}</td>
        <td>${user.hoTen}</td>
        <td>${user.email}</td>
        <td>${user.ngonNgu}</td>
        <td>${user.loaiND}</td>
        <td><button class="btn btn-info"  data-toggle="modal"
        data-target="#myModal" onclick="getInfoUser(${user.id})" >Sửa</button>
        <button class="btn btn-danger" onclick="deleteUser(${
          user.id
        })">Xoá</button></td>
        </tr>`;
  }
  document.getElementById("tblDanhSachNguoiDung").innerHTML = content;
}
//THÊM
getEle("btnThemNguoiDung").addEventListener("click", function () {
  //Đổi tên modal heading
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Thêm người dùng";
  //Thêm nút thêm ở footer
  var footer = `<button class="btn btn-success button_action" onclick="addUser()">Thêm</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});
function addUser() {
  //lấy thông tin
  var account = getEle("TaiKhoan").value;
  var fullname = getEle("HoTen").value;
  var password = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var typeUser = getEle("loaiNguoiDung").value;
  var language = getEle("loaiNgonNgu").value;
  var description = getEle("MoTa").value;
  var photo = getEle("HinhAnh").value;
  var Valid_result = checkValid(
    account,
    fullname,
    password,
    email,
    photo,
    typeUser,
    language,
    description
  );
  if (Valid_result !== null) {
    var user = new Users(
      "",
      account,
      fullname,
      password,
      email,
      typeUser,
      language,
      description,
      photo
    );
    services
      .addUserAPI(user)
      .then(function () {
        getListUsers();
        document.getElementsByClassName("close")[0].click();
      })
      .catch(function () {
        console.log(error);
      });
  }
}
//XOÁ
function deleteUser(id) {
  services
    .deleteUserAPI(id)
    .then(function () {
      getListUsers();
    })
    .catch(function (error) {
      console.log(error);
    });
}
//CẬP NHẬT
function getInfoUser(id) {
  //sửa modal heading
  document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa thông tin";
  //sửa modal footer
  var footer = `<button class="btn btn-warning" onclick="updateUser(${id})">Cập nhật</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
  //gọi phương thức
  services
    .getUserbyID(id)
    .then(function (result) {
      var user = result.data;
      getEle("TaiKhoan").value = user.taiKhoan;
      getEle("HoTen").value = user.hoTen;
      getEle("MatKhau").value = user.matKhau;
      getEle("Email").value = user.email;
      getEle("HinhAnh").value = user.hinhAnh;
      getEle("loaiNguoiDung").value = user.loaiND;
      getEle("loaiNgonNgu").value = user.ngonNgu;
      getEle("MoTa").value = user.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
}
function updateUser(id) {
  var account = getEle("TaiKhoan").value;
  var fullname = getEle("HoTen").value;
  var password = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var typeUser = getEle("loaiNguoiDung").value;
  var language = getEle("loaiNgonNgu").value;
  var description = getEle("MoTa").value;
  var photo = getEle("HinhAnh").value;
  var Valid_result = checkValid(
    account,
    fullname,
    password,
    email,
    photo,
    typeUser,
    language,
    description
  );
  //gọi phương thức
  if (Valid_result !== null) {
    var user = new Users(
      id,
      account,
      fullname,
      password,
      email,
      typeUser,
      language,
      description,
      photo
    );
    services
      .updateUserAPI(user)
      .then(function () {
        getListUsers();
        document.getElementsByClassName("close")[0].click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
