## 1、File Api

### 1、定义

文件（File）接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。

通常情况下， File 对象是来自用户在一个 `<input>` 元素上选择文件后返回的 FileList 对象，也可以是来自由拖放操作生成的 DataTransfer 对象，或者来自 HTMLCanvasElement 上的 mozGetAsFile() API。

File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的 context 中。比如说， FileReader, URL.createObjectURL(), createImageBitmap() (en-US), 及 XMLHttpRequest.send() 都能处理 Blob 和 File。

### 2、属性

|  属性名   |  含义  |
|  ----  | ----  |
| name  | 返回当前 File 对象所引用文件的名字。 |
| size  | 返回文件的大小。 |
| type  | 返回文件的 [多用途互联网邮件扩展类型(MIME Type)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types) |
| astModified  | 返回当前 File 对象所引用文件最后修改时间，自 UNIX 时间起始值（1970 年 1 月 1 日 00:00:00 UTC）以来的毫秒数。  |
| webkitRelativePath  | 返回 File 相关的 path 或 URL。(非标准，使用前检查跨浏览器支持) |
| lastModifiedDate  | 返回当前 File 对象所引用文件最后修改时间的 Date 对象。(弃用) |


### 3、方法

> File 接口没有定义任何方法，但是它从 Blob 接口继承了以下方法

Blob.slice([start[, end[, contentType]]]): 返回一个新的 Blob 对象，它包含有源 Blob 对象中指定范围内的数据。

## 2、Blob

### 1、定义

Blob 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。

Blob 表示的不一定是 JavaScript 原生格式的数据。File 接口基于 Blob，继承了 blob 的功能并将其扩展以支持用户系统上的文件。

要从其他非 blob 对象和数据构造一个 Blob，请使用 Blob() 构造函数。要创建一个 blob 数据的子集 blob，请使用 slice() 方法。要获取用户文件系统上的文件对应的 Blob 对象，请参阅 File 文档。接受 Blob 对象的 API 也被列在 File 文档中。

### 2、属性

|  属性名   |  含义  |
| ---- | ---- |
| size | Blob 对象中所包含数据的大小（字节）。 |
| type | 一个字符串，表明该 Blob 对象所包含数据的 MIME 类型。如果类型未知，则该值为空字符串。 |

### 3、方法

|  方法名   |  含义  |
| ---- | ---- |
| arrayBuffer | 返回一个 promise，其会兑现一个包含 Blob 所有内容的二进制格式的 ArrayBuffer。 |
| slice | 返回一个新的 Blob 对象，包含了源 Blob 对象中指定范围内的数据。 |
| stream | 返回一个能读取 Blob 内容的 ReadableStream。 |
| text | 返回一个 promise，其会兑现一个包含 Blob 所有内容的 UTF-8 格式的字符串。 |
