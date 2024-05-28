const base64 = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '+', '/'
];

/**
 * 将任意一个数字专程一个base64格式的字符串
 * @param num
 */
function encode(num) {
  // 1、首先将num转成2进制。1024 => 10000000000
  let binary = Math.abs(num).toString(2); // 10000000000

  // 2、在最右侧补充符号位，正数末位补0，负数末位补1。
  binary = binary > 0 ? binary + '0' : binary + '1';

  // 3、从最右到最左，每5位一组，不足5位的左边补充0。
  const zero = 5 - (binary.length % 5); // 补充多少个0
  if (zero > 0) {
    binary = binary.padStart(Math.ceil(binary.length / 5) * 5, '0'); // 000100000000000
  }

  // 4、将数组倒序排序。
  let parts = binary.match(/\d{5}/g); // [ '00010', '00000', '00000' ]
  parts.reverse(); // [ '00000', '00000', '00010' ]

  // 5、在最左边为每组补充一位，如果这组是这个数组的最后一组，那么补充0，前面的组补充1。 -- [ '100000', '100000', '000010' ]
  parts = parts.map((item, index) => (index === parts.length - 1 ? '0' : '1') + item);

  // 6、将组数字转成base64
  const chars = [];
  for (let index = 0; index < parts.length; index++) {
    const base64Index = parseInt(parts[index], 2);
    chars.push(base64[base64Index]);
  }

  return chars.join('');
}

/*
* test
* */
console.log(encode(1024)); // ggC
console.log(encode(2));// E
