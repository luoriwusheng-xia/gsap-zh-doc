# 安装

> GSAP 是“与框架无关的”，这意味着它可以在 React、Webflow、Wordpress 或任何其他 JS/Web 框架中使用。核心 GSAP 文件和所有插件都只是 Javascript 文件。
> 此视频和下面的安装帮助程序都介绍了加载文件的最常见方法。即通过 NPM、Yarn 和使用简单的 \<script> 标签。选择您自己的冒险，或查看左侧子菜单中的安装指南，以获取特定于框架或工具的指导。

### 下载

```shell
npm install gsap
```

```js
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
```

```shell
yarn add gsap
```

zip 下载内容

zip 文件包含以下目录：

- /minified/ - 最简单的选项。以脚本标签加载到网页中，普遍兼容并高度压缩以实现最大加载速度。
- /UMD/ - 缩小文件的未压缩版本，采用 UMD 格式（高度兼容）。通常，这些用于较旧的构建工具或调试（因为源代码是人类可读的）
- /ESM - ES 模块文件，经过编译以兼容几乎所有现代构建工具（没有花哨的 ES6 内容）
- /src/- 原始源代码文件，即现代 ES6 模块

### 安装帮助

**导入和包含插件**

免费

收费

#### 常见问题

1. 我需要为每个插件执行 gsap.registerPlugin（） 吗？

通常，是的。如果您通过 <script> 标签（即不是构建工具）加载 GSAP，只要核心已经加载，GSAP 就会尝试自动注册插件，但我们仍然建议注册插件，以便构建工具不会在摇树（tree shaking. ）期间删除它们。您可以一次注册所有插件，例如

```js
gsap.registerPlugin(MotionPathPlugin, ScrollToPlugin, TextPlugin)
```

2. 多次注册插件不好吗？

不，这完全没问题。它无济于事，也不伤人。

如果您正在使用模块环境并希望避免多次注册插件，则可以将 GSAP 和您需要的所有插件导入到一个 gsap.js 文件中，然后从其他模块中导入该文件中所需的内容。例如，使用 GSAP 核心和 DrawSVG gsap.js可以是：

```js
export * from 'gsap'
export * from 'gsap/DrawSVGPlugin'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
gsap.registerPlugin(DrawSVGPlugin)
```

然后在另一个文件中：

```js
import { gsap, DrawSVGPlugin } from '../gsap.js'
```

3. 我收到 TypeScript 错误 - 我该怎么办？

首先，确保您使用的是 GitHub 主存储库中的官方 TypeScript 定义。如果您仍然遇到问题，请随时在我们的论坛中发帖或在 GSAP GitHub 存储库上创建新问题。如果需要告诉编译器定义在哪里，可以执行如下操作：

```json
{
  "compilerOptions": {
    ...
  },
  "files": [
    "node_modules/gsap/types/index.d.ts"
  ]
}
```

4. 如何使用构建工具加载 GSAP 的非 ES 模块版本？

某些构建工具可能无法理解 ES 模块，因此您可以改用 UMD（通用模块定义）格式。为此，只需单击上面的安装帮助程序中的“NPM”，然后单击“UMD”并复制生成的代码。例如：`import { gsap } from "gsap/dist/gsap";`（注意文件都在 /dist/ 子目录中）

5. 为什么我的生产构建失败了？（可能在 webpack、vue-cli 或 create-react-app 中）
   现代构建工具通常使用称为 tree shaking 的过程来删除未使用的代码。有时它们过于激进并丢弃插件，因为您没有在自己的代码中的任何位置引用它们。为防止这种情况，您必须使用 gsap.registerPlugin 显式注册插件

```js
gsap.registerPlugin(MotionPathPlugin, ScrollToPlugin, TextPlugin)
```

6. bonus 插件的 CDN 链接在哪里？
   bonus 插件仅适用于 Club GSAP 会员，因此它们不在 CDN 上。您必须从您的帐户控制面板下载它们。

7. 我可以使用旧版本的 GSAP 吗？
   确定！您可以通过转到 GitHub 版本页面来查看和下载旧版本的 GSAP。不过，我们建议使用最新版本。
