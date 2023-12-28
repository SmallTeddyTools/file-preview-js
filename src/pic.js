// pic
console.log("preview jpg/jpeg/png onload ok")
window.onload = function () {
  var result = document.getElementById("result");
  var file = document.getElementById("file")
  if (typeof FileReader == "undefined") {
    alert('不支持')
    file.setAttribute("disabled", "disabled")
  }
}
function readAsDataURL() { //文件以Data URL形式进行读入页面
  let file = document.getElementById("file").files[0]
  if (file.type.indexOf("image") === -1) {
    alert('请提交图片')
    return false
  }
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function (e) {
    result.innerHTML = '<img src="' + this.result + '" alt=""/>'
  }
}

function readAsText() {
  var file = document.getElementById("file").files[0]
  let reader = new FileReader()
  reader.readAsText(file)
  reader.onload = function (e) {
    result.innerHTML = this.result
  }
}

function readAsBinaryString() {
  var file = document.getElementById("file").files[0]
  let reader = new FileReader()
  reader.readAsBinaryString(file)
  reader.onload = function (e) {
    result.innerHTML = this.result
  }
}
