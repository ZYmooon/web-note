### 便利贴

##### 访问地址是：http://zhoupengjie.top

用到的技术有
- 前端：前端代码结构的组织、模块化开发方式、webpack 及loader、babel和插件的使用、npm 的使用、前后端联调，es6语法
- 后端: 网站后端架构、MVC概念、Express的使用、路由、中间件、sqlite3、nodejs 调试
- 运维： linux 命令行、git、pm2、代理配置


#### clone后，需要``npm install`` 下载需要的依赖
- ``node bin/www`` 启动项目
- 如果出现sqlite3的报错，请
  ``npm uninstall sqlite3``
  然后再重新
  ``npm insatll sqlite3 -S``

- 如果项目没有启动，页面无内容，请检查bin/www 下的port是否是500
- 如果登录后出现报错，请联系我  weixin：zhoyi032  /   qq:1130192385



修改内容为：当便利贴内容为空时，可以删除，之前是当便签内容为空时，便签不能删除

新增：当页面大小发现变化时，标签重新通过瀑布流渲染
