# enkel_cli

> 模板管理器，管理各种项目模板，快速生成模板项目。支持自定义模板仓库，支持动态配置模板变量

## 安装

```
sudo npm install -g enkel_cli
```

### 1、可视化创建模板项目

```
enkel ui
```

### 2、模板仓库管理

```
// 显示所有模板仓库
enkel repository ls

// 显示当前使用中的模板仓库
enkel repository current

// 设置模板仓库
enkel repository use <仓库名>

// 新增自定义模板仓库
enkel repository add <仓库名> <仓库地址>

// 删除模板仓库
enkel repository del <仓库名>

// 显示帮助信息
enkel repository help
```

### 3、自定义模板

> 支持的自定义模板仓库类型：GitHub、GitLab、Bitbucket，如默认模板仓库地址为：https://github.com/enkeljs/enkel-templates

#### 3.1 自定义模板项目目录结构

    ├── templates
        ├── 模板项目A
        |   ├── ...
        |   ├── package.json // 可选文件，脚手架能自动识别项目根目录的package.json文件，并支持自动安装依赖
        |   └── enkel.config.js // 必需存在的文件
        ├── 模板项目B
        |   ├── ...
        |   └── enkel.config.js
        └── ...
  
#### 3.2 enkel.config.js文件

> 所有的描述应该尽可能的语义化，用于可视化创建模板项目。可动态添加占位符。占位符要以 $$ 开头和结尾，中间可包含大、小写字母、数字、下划线 (_)

```
module.exports = {
  description: 'PWA模板', // 模板项目的语义化描述，用于可视化创建项目-选择模板
  placeholder: { // 可动态添加不限个数的占位符
    $$PLACEHOLDER$$: { // 占位符以 $$ 开头和结尾，中间可包含大、小写字母、数字、下划线 (_)
      description: '占位符描述' // 占位符的语义化描述，用于可视化创建项目-占位符替换
    }
  }
}
```