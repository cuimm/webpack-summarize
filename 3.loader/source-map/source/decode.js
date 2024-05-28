const base64 = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '+', '/'
];

function getValue(char) {
  const index = base64.findIndex(item => item === char); // 找到这个字符在base64里的索引。8

  let str = (index).toString(2); // 将索引转成2进制。1000
  str = str.padStart(6, '0'); // 001000

  let sign = str.slice(-1) === '0' ? 1 : -1; // 符号位。
  str = str.slice(1, -1); // 中间那4个bit的数字才是真正的值。

  return parseInt(str, 2) * sign;
}

/**
 * 解码
 * @param values AAAA,IAAIA,EAAE,CAAN,CACIC,EAAE,CADN,CAEIC,EAAE
 * @returns {Array}
 */
function decode(values) {
  const parts = values.split(',');
  const positions = [];

  for (let index = 0; index < parts.length; index++) {
    const part = parts[index];
    const chars = part.split(''); // ['A', 'A', 'A', 'A']
    let position = [];
    for (let j = 0; j < chars.length; j++) {
      position.push(getValue(chars[j]));
    }
    positions.push(position);
  }

  return positions;
}

const positions = decode("AAAA,IAAIA,EAAE,CAAN,CACIC,EAAE,CADN,CAEIC,EAAE");
console.log('positions=', positions);


// [ 转换前行, 转换前列, 转换后行, 转换后列 ]
let offsets = positions.map(item => [item[2], item[3], 0, item[0]]);
let origin = {row: 0, column: 0};
let target = {row: 0, column: 0};
let mapping = [];
for (let i = 0; i < offsets.length; i++) {
  let [originRowOffset, originColumnOffset, targetRowOffset, targetColumnOffset] = offsets[i];
  origin.row += originRowOffset;
  origin.column += originColumnOffset;
  target.row += targetRowOffset;
  target.column += targetColumnOffset;
  mapping.push([`[${origin.row},${origin.column}]=>[${target.row},${target.column}]`]);
}
console.log('mapping=', mapping);
