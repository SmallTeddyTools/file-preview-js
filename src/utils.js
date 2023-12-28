// 使用FileList和file对象 读取用户上传你的文件信息
const showFileInfo = () => {
  // 返回FileList对象
  const FileList = document.querySelector("#file").files
  console.table(FileList);
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
