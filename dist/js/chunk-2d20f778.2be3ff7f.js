(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d20f778"],{b46f:function(e,n,r){"use strict";r.r(n);var t=function(){var e=this,n=e.$createElement;e._self._c;return e._m(0)},p=[function(){var e=this,n=e.$createElement,r=e._self._c||n;return r("section",[r("h1",[e._v("enkel_cli")]),r("blockquote",[r("p",[e._v("模板管理器，管理各种项目模板，快速生成模板项目。支持自定义模板仓库，支持动态配置模板变量")])]),r("h2",[e._v("安装")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":""}},[e._v("sudo npm install -g enkel_cli\n")])]),r("h3",[e._v("1、可视化创建模板项目")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":""}},[e._v("enkel ui\n")])]),r("h3",[e._v("2、模板仓库管理")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":""}},[e._v("// 显示所有模板仓库\nenkel repository ls\n\n// 显示当前使用中的模板仓库\nenkel repository current\n\n// 设置模板仓库\nenkel repository use <仓库名>\n\n// 新增自定义模板仓库\nenkel repository add <仓库名> <仓库地址>\n\n// 删除模板仓库\nenkel repository del <仓库名>\n\n// 显示帮助信息\nenkel repository help\n")])]),r("h3",[e._v("3、自定义模板")]),r("blockquote",[r("p",[e._v("支持的自定义模板仓库类型：GitHub、GitLab、Bitbucket，如默认模板仓库地址为：https://github.com/enkeljs/enkel-templates")])]),r("h4",[e._v("3.1 自定义模板项目目录结构")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":""}},[e._v("├── templates\n    ├── 模板项目A\n    |   ├── ...\n    |   ├── package.json // 可选文件，脚手架能自动识别项目根目录的package.json文件，并支持自动安装依赖\n    |   └── enkel.config.js // 必需存在的文件\n    ├── 模板项目B\n    |   ├── ...\n    |   └── enkel.config.js\n    └── ...\n")])]),r("h4",[e._v("3.2 enkel.config.js文件")]),r("blockquote",[r("p",[e._v("所有的描述应该尽可能的语义化，用于可视化创建模板项目。可动态添加占位符。占位符要以 $$ 开头和结尾，中间可包含大、小写字母、数字、下划线 (_)")])]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":""}},[e._v("module.exports = {\n  description: 'PWA模板', // 模板项目的语义化描述，用于可视化创建项目-选择模板\n  placeholder: { // 可动态添加不限个数的占位符\n    $$PLACEHOLDER$$: { // 占位符以 $$ 开头和结尾，中间可包含大、小写字母、数字、下划线 (_)\n      description: '占位符描述' // 占位符的语义化描述，用于可视化创建项目-占位符替换\n    }\n  }\n}\n")])])])}],o=r("2877"),l={},s=Object(o["a"])(l,t,p,!1,null,null,null);n["default"]=s.exports}}]);
//# sourceMappingURL=chunk-2d20f778.2be3ff7f.js.map