const importScript = function () {
  const srcItems = ['doc', 'pdf', 'pic', 'ppt', 'svg', 'xls', 'utils']
  srcItems.forEach(item => {
    let script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", `./src/${item}.js`); // 引用文件的路径
    document.getElementsByTagName('head')[0].appendChild(script); // 引用文件
  })
}

window.onload = function () {
  importScript()
};
