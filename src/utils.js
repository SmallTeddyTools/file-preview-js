// 使用FileList和file对象 读取用户上传你的文件信息
const showFileInfo = () => {
  // 返回FileList对象
  const FileList = document.querySelector("#file").files
  console.table(FileList);
}
