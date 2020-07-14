# 将base64转换为文件对象
## 前言：
  最近项目中遇到，从设备采集的图片文件是base64格式，需要转成文件对象，然后再在请求头中加入token信息，传给后端，便对base64转换为文件对象方法好好研究了下。
## 将base64转换为文件对象
```
 /**
 * @desc 将base64转换为文件对象
 */
dataURLtoFile(dataurl) {
  const arr = `data:image/png;base64,${dataurl}`.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  let blob = new File([u8arr], 'file', { type: mime })
  const params = new FormData()
  params.append('file', blob)
  return params
}
```
其中dataurl为获取到的base64编码，通过dataURLtoFile，转为文件对象，再添加请求头需要信息，穿给后端。这个方法是参考网上的，初步只是会用，下面我们对这个方法的详细实现分步说明。
###  具体实现
下面我们通过这个方法一步一步看如何实现。

### stpe1:对用base64编码过的二进制进行解码 
```
 const arr = `data:image/png;base64,${dataurl}`.split(',')
```
这个引入需要转换的base64编码，并规定了文件格式，arr[0]为`data:image/png;',arr[1]为${dataurl}

```
const mime = arr[0].match(/:(.*?);/)[1]
```
mime为文件对象，通过match方法，获取arr[0]文件夹中的'image/png'

```
const bstr = atob(arr[1])
```
arr[1]既为获取的base64编码，这里面有个陌生函数atob(),这里就需要了解js中的atob()函数和btoa()函数-Base64的编码与解码这两个概念了，

atob() //ASCII to Base64

btoa() //Base64 to ASCII

atob() 函数能够解码通过base-64编码的字符串数据。相反地，btoa()函数能够从二进制数据“字符串”创建一个base-64编码的ASCII字符串。

// ASCII 码使用指定的7 位或8 位二进制数组合来表示128或256种可能的字符。标准ASCII码也叫基础ASCII码，使用7位二进制数（剩下的1位二进制为0）来表示所有的大写和小写字母，数字0 到9、标点符号，以及在美式英语中使用的特殊控制字符 。

// Base64是一种基于64个可打印字符来表示二进制数据的表示方法。由于2^6=64，所以每6个比特为一个单元，对应某个可打印字符。3个字节有24个比特，对应于4个Base64单元，即3个字节可表示4个可打印字符。它可用来作为电子邮件的传输编码。在Base64中的可打印字符包括字母A-Z、a-z、数字0-9，这样共有62个字符，此外两个可打印符号在不同的系统中而不同。编码大小增长，每一个base64数位明确表示6位数据，所以3个8位的字符或者二进制输入能够被4个6位的base64位数代表，4×6 = 3×8，这代表着Base64编码的字符串或者文件的大小最大是源的133%倍，如果被编码的数据非常的小，那么这个比例将会非常的大，比如字符串"a" 的长度是1，但是编码后是4个长度的"YQ=="

基本用法
```
    let encodeData = window.btoa('Hello,File') // 编码
    let decodeData = window.atob(encodeData) // 解码
    >encodeData 'SGVsbG8sRmlsZQ=='
    >decodeData 'Hello,File'
```
### stpe2: 将编码转换成Unicode编码
```
let n = bstr.length
const u8arr = new Uint8Array(n)
```
n为解码后字符串的长度，然后创建初始化为0的，包含n个元素的无符号整型数组u8arr。

Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。

new Uint8Array(length); // 创建初始化为0的，包含length个元素的无符号整型数组

有符号和无符号区别：无符号数中，所有的位都用于直接表示该值的大小。有符号数中最高位用于表示正负
```
 u8arr[n] = bstr.charCodeAt(n)
```
获取bstr的每个字符串的Unicode 编码，并赋值给u8arr数组。

charCodeAt() 方法,返回字符串第一个字符的 Unicode 编码。

Unicode是一个编码方案，Unicode是为了解决传统的字符编码方案的局限而产生的，它为每种语言中的每个字符设定了统一并且唯一的二进制编码。
### stpe3：base64转换为文件
```
return new File([u8arr], 'file', { type: mime })
```
File() 构造器创建新的 File 对象实例。

eg: var myFile = new File(bits, name[, options]);

参数

bits:一个包含ArrayBuffer，ArrayBufferView，Blob，或者 DOMString 对象的 Array — 或者任何这些对象的组合。这是 UTF-8 编码的文件内容。

name:表示文件名称，或者文件路径。

options 可选选项对象，包含文件的可选属性。可用的选项如下：
type: DOMString，表示将要放到文件中的内容的 MIME 类型。默认值为 "" 。lastModified: 数值，表示文件最后修改时间的 Unix 时间戳（毫秒）。默认值为 Date.now()。
### stpe4：以二进制的方式传参
```
 const params = new FormData()
 params.append('file', blob)
```
到此，即完成从设备获取的base64编码转化为文件对象，传给后端，实现数据传输。
## 将图像文件转为Base64
有时，我们需要将上传的图片文件转为base64传给后端，下面也先给出整体方法
```
getBase64Img (img) {
    let canvas = document.createElement('canvas')
    canvas.width = img.width //确保canvas的尺寸和图片一样
    canvas.height = img.height
    let ctx = canvas.getContext('2d') 
    //将图片绘制到canvas中
    ctx.drawImage(img,0,0,img.width,img.height)
    let ext = img.src.substring(img.src.lastIndexOf(',')+1).toLowerCase() // 获取图片类型
    let dataUrl = canvas.toDataUTL('image/'+ext) //转换图片为dataURL
    return dataURL
}
```
### 创建 Canvas 对象
```
 let canvas = document.createElement('canvas')
```
### 定义canvas对象相关参数
```
 canvas.width = img.width
canvas.height = img.height
let ctx = canvas.getContext('2d') // 指定了二维绘图
ctx.drawImage(img,0,0,img.width,img.height)
```
context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height)

x 表示在画布上放置图像的 x 坐标位置，必填

y 表示在画布上放置图像的 y 坐标位置，必填

width 表示要使用的图像的宽度，此时将拉伸或缩小图像，可选

height 表示要使用的图像的高度，此时将拉伸或缩小图像，可选

sx 表示图片开始剪切的 x 坐标位置，可选

sy 表示图片开始剪切的 y 坐标位置，可选

swidth 表示被剪切图像的宽度，可选

sheight 表示被剪切图像的高度，可选

可以简单的理解成：截切图片上的(sx,sy) 到 (sx+swidth,sy+sheight) 区域放置到画布上的 (x,y) 到 (x+width,y+height)区域。
### 将图片绘制到canvas中，并转换为dataURL字符串
```
 ctx.drawImage(img,0,0,img.width,img.height)
 let ext = img.src.substring(img.src.lastIndexOf(',')+1).toLowerCase() // 获取图片类型
 let dataUrl = canvas.toDataUTL('image/'+ext) //转换图片为dataURL
 return dataURL
```
这样既将图片文件转为base64，这两个方法可根据业务具体需求使用。


