function Validation(){
    // Kiểm tra rỗng
    this.checkNull = function (value, errorID, mess) {
        if (value === "") {
          getEle(errorID).innerHTML = mess;
          getEle(errorID).style.display = "block";
          return false;
        } else {
          getEle(errorID).innerHTML="";
          getEle(errorID).style.display = "none";
          return true;
        }
      };
       //KT độ dài
   this.lengthCheck = function (value, errorID, mess, min, max) {
    if (value.trim().length >= min && value.trim().length <= max) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";
    return false;
  };
      // Kiểm tra chuỗi ký tự
  this.letterCheck = function (value, errorID, mess) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";
    return false;
  };
  
  //KT email
  this.emailCheck = function (value, errorID, mess) {
    var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(email)) {
        getEle(errorID).innerHTML = "";
        getEle(errorID).style.display = "none";
        return true;
      }
      getEle(errorID).innerHTML = mess;
      getEle(errorID).style.display = "block";
      return false;
    };

  //kiểm tra password
  this.passwordCheck = function (value, errorID, mess) {
    var password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
   if (value.match(password)) {
    getEle(errorID).innerHTML = "";
    getEle(errorID).style.display = "none";
    return true;
  }
  getEle(errorID).innerHTML = mess;
  getEle(errorID).style.display = "block";
  return false;
  };

  //Phải chọn
  this.selectionCheck = function (value, selection, errorID, mess) {
    if (value === selection) {
      document.getElementById(errorID).style.display = "block";
      document.getElementById(errorID).innerHTML = mess;
      return false;
    }
    document.getElementById(errorID).style.display = "none";
    document.getElementById(errorID).innerHTML = null;
    return true;
  };
  //Đã tồn tại
  this.existed = function (element,id,errorID,mess){
    var count = 0;
        for (var i = 0; i < id; i ++){
          var arr=document.getElementsByClassName("taiKhoan_validation")[i].innerHTML;
        if (arr === element)  {
            count ++;
            break
        }
    }
    if (count>0){document.getElementById(errorID).style.display = "block";
    document.getElementById(errorID).innerHTML = mess;
    return false;}
    document.getElementById(errorID).style.display = "none";
    document.getElementById(errorID).innerHTML = null;
    return true;
}


}