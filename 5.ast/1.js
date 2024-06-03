/**
 * esprima: 把JS代码转换成AST语法树
 */
const esprima = require('esprima');

/**
 * estraverse：遍历语法树，修改树上的节点
 */
const estraverse = require('estraverse');

/**
 * escodegen：把AST语法树重新转换成代码
 */
const escodegen = require('escodegen');



// 源代码
const code = 'const sum = (a, b) => a + b';

// 将源代码转换为AST
const ast = esprima.parse(code);

console.log(ast);
/*
{
    type: 'Program',
    body: [
        VariableDeclaration {
           type: 'VariableDeclaration',
           declarations: [Array],
           kind: 'const'
        }
   ],
    sourceType: 'script'
}
*/

let indent = 0;

function padding() {
  return ' '.repeat(indent);
}

estraverse.traverse(ast, {
  enter(node) {
    console.log(padding() + node.type + '进入');
    indent += 2;
  },
  leave(node) {
    indent -= 2;
    console.log(padding() + node.type + '离开');
  },
});

/**
Program进入
  VariableDeclaration进入
    VariableDeclarator进入
      Identifier进入
      Identifier离开
      ArrowFunctionExpression进入
        Identifier进入
        Identifier离开
        Identifier进入
        Identifier离开
        BinaryExpression进入
          Identifier进入
          Identifier离开
          Identifier进入
          Identifier离开
        BinaryExpression离开
      ArrowFunctionExpression离开
    VariableDeclarator离开
  VariableDeclaration离开
Program离开
 */
