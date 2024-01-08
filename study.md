# 学习笔记

## 一、File Api

### 1、File Api 定义

文件（File）接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。

通常情况下， File 对象是来自用户在一个 `<input>` 元素上选择文件后返回的 FileList 对象，也可以是来自由拖放操作生成的 DataTransfer 对象，或者来自 HTMLCanvasElement 上的 mozGetAsFile() API。

File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的 context 中。比如说， FileReader, URL.createObjectURL(), createImageBitmap() , 及 XMLHttpRequest.send() 都能处理 Blob 和 File。

### 2、File Api 属性

|  属性名   |  含义  |
|  ----  | ----  |
| name  | 返回当前 File 对象所引用文件的名字。 |
| size  | 返回文件的大小。 |
| type  | 返回文件的 [多用途互联网邮件扩展类型(MIME Type)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types) |
| astModified  | 返回当前 File 对象所引用文件最后修改时间，自 UNIX 时间起始值（1970 年 1 月 1 日 00:00:00 UTC）以来的毫秒数。  |
| webkitRelativePath  | 返回 File 相关的 path 或 URL。(非标准，使用前检查跨浏览器支持) |
| lastModifiedDate  | 返回当前 File 对象所引用文件最后修改时间的 Date 对象。(弃用) |

### 3、File Api 方法

> File 接口没有定义任何方法，但是它从 Blob 接口继承了以下方法

Blob.slice([start[, end[, contentType]]]): 返回一个新的 Blob 对象，它包含有源 Blob 对象中指定范围内的数据。

## 二、Blob

### 1、Blob 定义

Blob 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。

Blob 表示的不一定是 JavaScript 原生格式的数据。File 接口基于 Blob，继承了 blob 的功能并将其扩展以支持用户系统上的文件。

要从其他非 blob 对象和数据构造一个 Blob，请使用 Blob() 构造函数。要创建一个 blob 数据的子集 blob，请使用 slice() 方法。要获取用户文件系统上的文件对应的 Blob 对象，请参阅 File 文档。接受 Blob 对象的 API 也被列在 File 文档中。

### 2、Blob 属性

|  属性名   |  含义  |
| ---- | ---- |
| size | Blob 对象中所包含数据的大小（字节）。 |
| type | 一个字符串，表明该 Blob 对象所包含数据的 MIME 类型。如果类型未知，则该值为空字符串。 |

### 3、Blob 方法

|  方法名   |  含义  |
| ---- | ---- |
| arrayBuffer | 返回一个 promise，其会兑现一个包含 Blob 所有内容的二进制格式的 ArrayBuffer。 |
| slice | 返回一个新的 Blob 对象，包含了源 Blob 对象中指定范围内的数据。 |
| stream | 返回一个能读取 Blob 内容的 ReadableStream。 |
| text | 返回一个 promise，其会兑现一个包含 Blob 所有内容的 UTF-8 格式的字符串。 |

### 4、Blob 代码

```js
async function handleData(data) {
  const dataHandlers = {
    Blob: async (data) => data,
    Response: async (data) => await data.blob(),
    ArrayBuffer: async (data) => new Blob([data])
  }
  for (const type in dataHandlers) {
    if (data instanceof window[type]) {
      return await dataHandlers[type](data);
    }
  }
  // 处理未知类型的数据
  return null;
}
```

## 三、FileReader

### 1、FileReader 定义

FileReader对象负责把文件读入内存,并且读取文件中的数据

### 2、FileReader 方法

| 方法名 | 含义 |
| -- | -- |
| readAsText(Blob,type) | 将Blob对象或文件数据读取为文本数据 第二个参数是文本编码方式 默认UTF-8 |
| readAsDataURL(Blob) | 将Blob对象或文件数据读取为二进制字符串 通常用于提交到服务器 |
| readAsBinaryString(Blob) | 将Blob对象或文件数据读取为DataURL字符串 该方法是将数据以一种特殊格式的URL地址形式直接读入页面 |
| readAsArrayBuffer(Blob) | 将Blob对象或文件数据读取为ArrayBuffer对象 |
| abort() | 中断读取操作 |

## 四、ArrayBuffer

### 1、ArrayBuffer 定义

对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（TypedArray 视图和 DataView 视图)来读写，视图的作用是以指定格式解读二进制数据。

### 2、ArrayBuffer 方法

| 方法名 | 含义 |
| -- | -- |
| slice(begin,end) | 返回一个新的 ArrayBuffer 对象，包含了原始 ArrayBuffer 中的数据，从 begin 到 end（不包含该
元素） |

### 3、ArrayBuffer 属性

| 属性名 | 含义 |
| -- | -- |
| byteLength | 返回 ArrayBuffer 对象所占据的内存长度（以字节为单位） |
| byteOffset | 返回 ArrayBuffer 对象的起始位置（以字节为单位） |

### 4、ArrayBuffer 示例

```js
const buf = new ArrayBuffer(3);
const bufView = new Uint8Array(buf);
bufView[0] = 255;
bufView[1] = 255;
bufView[2] = 255;
console.log(bufView); // Uint8Array [255, 255, 255]
```

### 5、ArrayBuffer 应用

- 1、ArrayBuffer 对象可以被多个 TypedArray 对象重写，这意味着多个视图可以同时存取同一个 ArrayBuffer
- 2、ArrayBuffer 对象可以被多个视图同时存取，因为它们引用的内存区域是独立的
- 3、ArrayBuffer 对象作为参数，传递给另一个函数，可以在函数内部操作这个对象，而不会在函数调用时被改变

## 五、Uint8Array

### 1、Uint8Array 定义

对象是 ArrayBuffer 的一个数据类型（8 位不带符号整数）。

### 2、Uint8Array 方法

| 方法名 | 含义 |
| -- | -- |
| from() | 从一个数组或可迭代的对象创建一个新的Uint8Array数组，可参见Array.from() |
| of() | 通过一个可变数目的参数创建一个新的Uint8Array数组，可参见Array.of()|

> extends TypedArray

| Type | Value Range | Size in bytes | Web IDL type |
| -- | -- | -- | -- |
| Int8Array | -128 to 127 | 1 | byte |
| Uint8Array | 0 to 255 | 1 | octet |
| Uint8ClampedArray | 0 to 255 | 1 | octet |
| Int16Array | -32768 to 32767 | 2 | short |
| Uint16Array | 0 to 65535 | 2 | unsigned short |
| Int32Array | -2147483648 to 2147483647 | 4 | long |
| Uint32Array | 0 to 4294967295 | 4 | unsigned long |
| Float32Array | -3.4e38 to 3.4e38 | 4 | unrestricted float |
| Float64Array | -1.8e308 to 1.8e308 | 8 | unrestricted double |
| BigInt64Array | -263 to 263 - 1 | 8 | bigint |
| BigUint64Array | 0 to 264 - 1 | 8 | bigint |

| 方法名 | 含义 |
| -- | -- |
| at() | 返回给定索引处的数组元素。接受从最后一项往回计算的负整数。 |
| copyWithin() | 在数组内复制数组元素序列。参见 Array.prototype.copyWithin()。 |
| entries() | 返回一个新的数组迭代器对象，其中包含数组中每个索引的键/值对。参见 Array.prototype.entries()。 |
| every() | 如果调用数组中的每个元素都满足测试函数，则返回 true。参见 Array.prototype.every()。 |
| fill() | 用静态值填充数组中从开始索引到结束索引的所有元素。参见 Array.prototype.fill()。 |
| filter() | 返回一个新数组，其中包含调用所提供的筛选函数返回为 true 的所有数组元素。参见 Array.prototype.filter()。 |
| find() | 返回数组中满足提供的测试函数的第一个元素的值，如果没有找到合适的元素，则返回 undefined。参见 Array.prototype.find()。 |
| findIndex() | 返回数组中满足提供的测试函数的第一个元素的索引，如果没有找到合适的元素，则返回 -1。参见 Array.prototype.findIndex()。 |
| findLast() | 回数组中满足提供的测试函数的最后一个元素的值，如果没有找到合适的元素，则返回 undefined。参见 Array.prototype.findLast()。 |
| findLastIndex() | 返回数组中满足所提供测试函数的最后一个元素的索引，如果没有找到合适的元素，则返回 -1。参见 Array.prototype.findLastIndex()。 |
| forEach() | 对调用数组中的每个元素调用函数。参见 Array.prototype.forEach()。 |
| includes() | 根据类型化数组是否包含一个确定的元素，来决定返回 true 还是 false 参见 Array.prototype.includes()。 |
| indexOf() | 返回在调用数组中可以找到给定元素的第一个（最小）索引，如果没有找到，则返回 -1。参见 Array.prototype.indexOf()。 |
| join() | 将数组的所有元素连接为字符串。参见 Array.prototype.join()。 |
| keys() | 返回一个新的数组迭代器对象，该对象包含数组中每个索引的键。参见 Array.prototype.keys()。 |
| lastIndexOf() | 返回在调用数组中可以找到给定元素的最后一个（最大）索引，如果找不到，则返回 -1。参见 Array.prototype.lastIndexOf()。 |
| map() | 返回一个新数组，其中包含对调用数组中的每个元素调用函数的结果。参见 Array.prototype.map()。 |
| reduce() | 对数组的每个元素（从左到右）执行用户提供的“reducer”回调函数，将其简化为单个值。参见 Array.prototype.reduce()。 |
| reduceRight() | 对数组的每个元素（从右到左）执行用户提供的“reducer”回调函数，将其简化为单个值。参见 Array.prototype.reduceRight()。 |
| reverse() | 反转数组元素的顺序——第一个成为最后一个，最后一个成为第一个。参见 Array.prototype.reverse()。 |
| set() | 在类型化数组中存储多个值，从指定数组读取输入值。 |
| slice() | 提取调用数组的一部分并返回一个新数组。参见 Array.prototype.slice()。 |
| some() | 如果调用数组中至少有一个元素满足提供的测试函数，则返回 true。参见 Array.prototype.some()。 |
| sort() | 对数组的元素进行排序并返回该数组。参见 Array.prototype.sort()。 |
| subarray() | 从给定的开始和结束的元素索引返回一个新的 TypedArray。 |
| values() | 返回一个新的数组迭代器对象，该对象包含数组中每个索引的值。参见 Array.prototype.values()。 |
| toLocaleString() | 返回一个表示调用数组及其元素的本地化字符串。参见 Array.prototype.toLocaleString()。 |
| toString()  | 返回一个表示调用数组及其元素的字符串。参见 Array.prototype.toString()。 |
| iterator | 返回一个新的数组迭代器对象，该对象包含数组中每个索引的值。 |

### 3、Uint8Array 属性

| 属性名 | 含义 |
| -- | -- |
| BYTES_PER_ELEMENT | 静态属性 length 一直为 0。想获知其真实长度（元素个数），请参阅 Uint8Array.prototype.length。 |
| length | TypedArray 对象的原型。 |

## 六、TextEncoder

### 1、TextEncoder 定义

接受代码点流作为输入，并提供 UTF-8 字节流作为输出。

### 2、TextEncoder 属性

| 属性名 | 含义 |
| -- | -- |
| encoding | 总是返回 utf-8。|

### 2、TextEncoder 方法

| 方法名 | 含义 |
| -- | -- |
| encode() | 接受一个字符串作为输入，返回一个包含 UTF-8 编码的文本的 Uint8Array。 |
| encodeInto() | 接受一个字符串（编码的对象）和一个目标 Uint8Array（用于放入生成的 UTF-8 编码的文本）作为输入，并且返回一个指示编码进度的对象。此方法的性能可能会比更早出现的 encode() 方法好一些。 |

### 3、TextEncoder 构造函数

| 构造函数 | 含义 |
| -- | -- |
| new TextEncoder(label) | 返回一个新的TextEncoder对象，label参数是可选的，表示TextEncoder对象的编码方式 |

## 七、TextDecoder

### 1、TextDecoder 定义

接口表示一个文本解码器，一个解码器只支持一种特定文本编码，例如 utf-8、iso-8859-2、koi8、cp1261，gbk 等等。解码器将字节流作为输入，并提供代码点流作为输出。

### 2、TextDecoder 属性

| 属性名 | 含义 |
| -- | -- |
| encoding | 返回一个字符串，表示TextDecoder对象所使用的编码方式 |
| fatal | 返回一个布尔值，表示解码过程中是否发生错误 |
| ignoreBOM | 返回一个布尔值，表示解码过程中是否忽略BOM |

### 3、TextDecoder 方法

| 方法名 | 含义 |
| -- | -- |
| decode() | 返回一个字符串，其中包含使用特定 TextDecoder 对象的方法解码的文本。 |

## 八、base64

### 1、base64 定义

Base64是网络上最常见的用于传输8Bit字节码的编码方式之一，Base64就是一种基于64个可打印字符来表示二进制数据的方法。编码规则：把3个字节变成4个字节;每76个字符加一个换行符;最后的结束符也要处理。

### 2、base64 方法

| 方法名 | 含义 |
| -- | -- |
| atob(encodedString) | 返回一个解码后的字符串，表示对参数encodedString进行base-64解码 |
| btoa(rawString) | 返回一个编码后的字符串，表示对参数rawString进行base-64编码 |

> 备注： 函数 base64DecToArr(sBase64[, nBlocksSize]) 将返回 uint8Array 字节数组。如果你的目标是构建 16 位/ 32 位/ 64 位原始数据的缓冲区，使用 nBlocksSize 参数，这是 uint8Array.buffer.bytesLength 属性必须产生的字节数的倍数［1 或省略为 ASCII、二进制字符串（即字符串中的每个字符都被当作二进制数据的一个字节来处理）或 UTF-8 编码的字符串，2 用于 UTF-16 字符串，4 用于 UTF-32 字符串］。

![file-convert](/assets/imgs/file-convert.png)

## 九、ArrayBuffer、Uint8Array、Blob、 File、DataURL 相互转换

### 1、TextEncoder => ArrayBuffer

```javascript
let encoder = new TextEncoder();
 
// 字符 转 Uint8Array
let uint8Array = encoder.encode("你好啊");
 
// Uint8Array 转 ArrayBuffer
let arrayBuffer = uint8Array.buffer
```

### 2、Blob => ArrayBuffer

```javascript
let str = 'hello，你好吗？'
let blob = new Blob([str],{type:'text/plain;charset=utf-8'});
let utf8decoder = new TextDecoder()
blob.arrayBuffer().then(buffer=>{
  // ArrayBuffer
  console.log(buffer)
  let text = utf8decoder.decode(buffer)
  // String
  console.log(text)
})
```

### 3、FileReader => ArrayBuffer

```javascript
let str = 'hello，你好吗？'
let blob = new Blob([str],{type:'text/plain;charset=utf-8'});
let utf8decoder = new TextDecoder()
let fr = new FileReader()
fr.readAsArrayBuffer(blob)
fr.onload = function(res) {
  // ArrayBuffer
  let buffer = fr.result
  console.log(buffer)
  let text = utf8decoder.decode(buffer)
  // String
  console.log(text)
}
```

### 4、file => DataURL

```javascript
let img = document.getElementById('img')
let file = document.getElementById('file')
file.onchange = function () {
  let imgFile = this.files[0]
  // 利用URL.createObjectURL()
  img.src = URL.createObjectURL(imgFile)
  img.onload = function () {
    URL.revokeObjectURL(this.src)
  }
  // 利用FileReader.readAsDataURL()
  let fileReader = new FileReader()
  fileReader.readAsDataURL(imgFile)
  fileReader.onload = function () {
    img.src = this.result
  }
}
```

### 5、DataURL => file

```javascript
function dataURLToFile (dataUrl, fileName) {
  const dataArr = dataUrl.split(',')
  const mime = dataArr[0].match(/:(.*);/)[1]
  const originStr = atob(dataArr[1])
  return new File([originStr], fileName, { type: mime })
}
dataURLToFile('data:text/plain;base64,YWFhYWFhYQ==', '测试文件')
 
// File {name: '测试文件', lastModified: 1640784525620, lastModifiedDate: Wed Dec 29 2021 21:28:45 GMT+0800 (中国标准时间), webkitRelativePath: '', size: 7, …}
```

### 6、canvas=> DataURL

```javascript
// html
 <input type="file" accept="image/*" id="file">
 
// js
document.querySelector('#file').onchange = function () {
  canvasToDataURL(this.files[0])
    .then(res => console.log(res))
}
function canvasToDataURL (file) {
  return new Promise(resolve => {
    const img = document.createElement('img')
    img.src = URL.createObjectURL(file)
    img.onload = function () {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      resolve(canvas.toDataURL('image/png', 1))
    }
  })
}
```

### 7、DataURL => canvas

```javascript
function dataUrlToCanvas (dataUrl) {
  return new Promise(resolve => {
    const img = new Image()
    img.src = dataUrl
    img.onload = function () {
      const canvas = document.createElement('canvas')
      canvas.width = this.width
      canvas.height = this.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(this, 0, 0)
      resolve(canvas)
    }
  })
}
const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUh...'
dataUrlToCanvas(dataUrl)
```

### 8、canvas => file

```html
<input type="file" accept="image/*" id="file">
```

```javascript
// 利用 canvas.toBlob() 将 canvas 转成 blob
document.querySelector('#file').onchange = function () {
  canvasToDataURL(this.files[0])
    .then(res => console.log(res))
}
function canvasToDataURL (file) {
  return new Promise(resolve => {
    const img = document.createElement('img')
    img.src = URL.createObjectURL(file)
    img.onload = function () {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      canvas.toBlob(function (e) {
        resolve(e)
      }, 'image/png', 1)
    }
  })
}

// 利用 new File() 将 blob 转成 file
function blobToFile(blob, filename, type) {
  return new File([blob], filename, { type })
}
 
blobToFile('test info', 'test', 'text/plain' )
```
