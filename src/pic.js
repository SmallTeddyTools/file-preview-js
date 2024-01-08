// pic
console.log("preview jpg/jpeg/png onload ok")

window.onload = function () {
  const file = document.querySelector("#file")
  if (typeof FileReader == "undefined") {
    file.setAttribute("disabled", "disabled")
    return console.error("不支持!")
  }
}

function readAsDataURL() {
  //文件以Data URL形式进行读入页面
  const file = document.querySelector("#file").files[0]
  console.log(file.type)
  if (!file.type.startsWith("image")) {
    return console.error("请提交图片!")
  }
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = e => result.innerHTML = `<img src="${e.target.result}" alt="" />`
}
