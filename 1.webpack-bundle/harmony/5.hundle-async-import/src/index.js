btn.addEventListener('click', () => {

  // webpackChunkName: “c” 是魔法注释，置顶代码块的名字为c。如果不加这个魔法注释，那么代码块的名字就是个数字，0.js\1.js\2.js...
  // /* webpackChunkName: "title" */ 是魔法注释，置顶代码块的名字为title。如果不加这个魔法注释，那么代码块的名字就是个数字，0.js\1.js\2.js...
  import(/* webpackChunkName: "title" */ './title.js').then(res => {
    console.log(res);
  });

});

