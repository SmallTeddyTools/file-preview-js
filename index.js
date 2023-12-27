const importScript = function () {
  let script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", "./src/utils.js"); // 引用文件的路径
  document.getElementsByTagName('head')[0].appendChild(script); // 引用文件
}

window.onload = function () {
  importScript()
};
