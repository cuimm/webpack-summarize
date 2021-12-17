1. 初始化参数。
- 从配置文件和shell语句中读取并合并参数，得到最终的编译参数。

2. 初始化Compiler对象。
- 用上一步得到的配置参数，调用webpack方法，初始化Compiler对象。

3. 注册插件 plugins。
- 执行plugin的apply方法，注册插件。

4. 开始编译。
- 执行compiler的run方法，开始编译。

5. 确定入口
- 根据配置的entry，找到所有的入口文件。

6. 编译模块
- 读取入口模块的内容，编译成抽象语法树 ast，通过 require、import 找到入口文件的依赖模块。
- 递归的编译模块文件依赖的所有模块。
- 按照入口模块的依赖关系，组装成一个个的代码块 chunk。

7. 输出资源
- 将每个代码块 chunk 转换成一个个的文件加入输出列表。
- 根据配置 output 确定输出的路径和文件名，将文件写入文件系统。