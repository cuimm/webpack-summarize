/*
* VLQ - Variable Length Quantities - 可变长度编码
* webpack使用的是base64 vlq编码
*
* vlq源码位置：/node_modules/@types/webpack/node_modules/source-map/lib/base64-vlq.js
*
* 如何将 1024 进行VLQ编码？
* */

// 要转化的目标数字
const targetNumber = 1024;

// base64 字符表
const base64 = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '+', '/'
];

// 1、首先，将 1024 转化为二进制。 -- 10000000000，一共 11 位
let binary = Math.abs(targetNumber).toString(2); // 10000000000


// 2、在最右边补充符号位，正数末位补0，负数末位补1。
// 因为1024是正数，所以最右边补充一个0 -- 100000000000，一共12位
binary = targetNumber > 0 ? binary + '0' : binary + '1'; // 100000000000


// 3、从最右边到最左边，每5位划分一组，不足5位的左边补充0。-- 00010 00000 00000，一共15位
let padded = binary.padStart(Math.ceil(binary.length / 5) * 5, '0'); // 000100000000000


// 4、将组的位置颠倒
let parts = padded.match(/\d{5}/g); // [ '00010', '00000', '00000' ]
parts.reverse(); // [ '00000', '00000', '00010' ]

// 5、在最左边为每组补充一位，如果这组是这个数组的最后一组，那么补充0，前面的组补充1。 -- [ '100000', '100000', '000010' ]
parts = parts.map((item, index) => (index === parts.length - 1) ? '0' + item : '1' + item);

// 6、将组数字转成base64
const chars = [];
for (let index = 0; index < parts.length; index++) {
  const base64Index = parseInt(parts[index], 2); // 将2进组转化为10进制
  chars.push(base64[base64Index]);
}
console.log(chars); // ['g', 'g', 'C']

// 7、输出最后编码
const result = chars.join(''); // ggC
