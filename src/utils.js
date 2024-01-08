// 使用FileList和file对象 读取用户上传你的文件信息
const showFileInfo = () => {
  // 返回FileList对象
  const FileList = document.querySelector("#file").files
  console.table(FileList);
}

function readAsText() {
  const file = document.querySelector("#file").files[0]
  const reader = new FileReader()
  reader.readAsText(file)
  reader.onload = e => result.innerHTML = e.target.result
}

function readAsBinaryString() {
  const file = document.querySelector("#file").files[0]
  const reader = new FileReader()
  reader.readAsBinaryString(file)
  reader.onload = e => result.innerHTML = e.target.result
}


/**
 * 用于将文本转换为 ArrayBuffer
 * @param {string} text 
 * @returns 
 */
function TextEncoder2ArrayBuffer(text) {
  // 创建 TextEncoder 对象
  const encoder = new TextEncoder();
  // 字符 转 Uint8Array
  const uint8Array = encoder.encode(text);
  // Uint8Array 转 ArrayBuffer
  const arrayBuffer = uint8Array.buffer
  result.innerHTML = uint8Array
  alert("数据在控制台查看")
  console.log(arrayBuffer)
}

/**
 * 用于将 blob 转换为 ArrayBuffer
 */
function blob2ArrayBuffer() {
  let str = ''
  const file = document.querySelector("#file").files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = e => {
    str = e.target.result
    // 创建 Blob 对象，指定类型为 text/plain;charset=utf-8
    const blob = new Blob([str], { type: "text/plain;charset=utf-8" });
    // 创建 TextDecoder 对象
    const utf8decoder = new TextDecoder()
    // 获取 ArrayBuffer
    blob.arrayBuffer().then(buffer => {
      // 创建 ArrayBuffer
      const text = utf8decoder.decode(buffer)
      // 返回解码后的字符串
      result.innerHTML = text
    })
  }

}

/**
 * 创建一个函数，用于将字符串转换为ArrayBuffer
 */
function fileReader2ArrayBuffer() {
  let str = ''
  const file = document.querySelector("#file").files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = e => {
    str = e.target.result
    // 创建一个blob对象，用于存储字符串
    const blob = new Blob([str], { type: "text/plain;charset=utf-8" });
    // 创建一个TextDecoder对象，用于解码blob对象
    const utf8decoder = new TextDecoder()
    // 创建一个FileReader对象，用于读取blob对象
    const fr = new FileReader()
    // 读取blob对象
    fr.readAsArrayBuffer(blob)
    // 当blob对象读取完毕时，执行回调函数
    fr.onload = () => {
      // 创建 ArrayBuffer
      const buffer = fr.result
      // 使用TextDecoder解码ArrayBuffer
      const text = utf8decoder.decode(buffer)
      // 返回解码后的字符串
      result.innerHTML = text
    }
  }
}
