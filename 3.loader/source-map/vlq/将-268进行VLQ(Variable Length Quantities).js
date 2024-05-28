// 要转码的目标数字
const targetNumber = -168;

// base64 字符表
const base64 = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '+', '/'
];

// 1、将 168 转为二进制。 -- 10101000，8位
let binary = Math.abs(targetNumber).toString(2);

console.log('1.', binary); // 10101000

// 2、在最右边补充符号位，正数末位补充0，负数末位补充1。
binary = targetNumber > 0 ? binary + '0' : binary + '1'; // 101010001
console.log('2.', binary); // 101010001

// 3、从最右边到最左边，每5位划分一组，不足5位的左边补0。-- 01010 10001
let padded = binary.padStart(Math.ceil(binary.length / 5) * 5, '0');
console.log('3.', padded); // 0101010001

// 4、将组的位置颠倒
let parts = padded.match(/\d{5}/g); // [ '01010', '10001' ]
parts.reverse();
console.log('4.', parts); // [ '10001', '01010' ]

// 5. 在最左边为每组补充一位，如果这组是这个数组的最后一组，那么补充0，前面的组补充1。
parts = parts.map((item, index) => (index === parts.length - 1) ? '0' + item : '1' + item);

// 6. 将每组的二进制数字转为base64
let charts = [];
for (let index = 0; index < parts.length; index++) {
  const base64Index = parseInt(parts[index], 2);
  charts.push(base64[base64Index]);
}
console.log('6.', charts);

// 7、得到最终编码 -- xK
const result = charts.join('');
console.log('7.', result); // xK


