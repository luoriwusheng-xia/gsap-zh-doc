# GSAP

`gsap`对象是访问GSAP大部分功能的入口点。它只是一个通用对象，具有各种用于创建和控制`补间动画（Tweens）`和`时间轴（Timelines）`的方法和属性，补间动画和时间轴是需要理解的两个最重要的概念。

## 快速概览

要快速了解GSAP对象，可以查看Snorkl.tv的`“GSAP 3 Express”课程`中的这个视频——这是学习基础知识的最佳途径之一。

```
<video preload="none" tabindex="-1" style="" src="blob:https://player.vimeo.com/8784fab2-cd13-476b-bbe4-570218bbc0eb"></video>
```

要充分利用GSAP，理解补间动画和时间轴是什么至关重要：

### 什么是补间动画？

`补间动画（Tween）`是完成所有动画工作的部分——可以把它想象成一个**高性能的属性设置器**。你输入目标（要动画的对象）、持续时间以及要动画的任何属性，然后当补间动画的播放头移动到新位置时，它会计算出该点的属性值应该是多少，并相应地应用它们。

#### 创建补间动画的常用方法：

- gsap.to()
- gsap.from()
- gsap.fromTo()

对于简单动画（没有复杂的顺序），上述方法就足够了！例如：

```js
// 在1秒的时间内旋转并移动类名为“box”的元素（“x”是translateX()变换的简写）。
gsap.to('.box', { rotation: 27, x: 100, duration: 1 })
```

<iframe height="400" title="GSAP Basic Tween" src="https://codepen.io/GreenSock/embed/663f83b218082c4181ae23fd42d59cb5?default-tab=result&amp;theme-id=41164" frameborder="no" allowtransparency="true" allowfullscreen="" style="width: 100%;"></iframe>

你可以使用`delay`特殊属性进行基本的顺序控制，但时间轴使排序和复杂的编排变得更加容易。

### 什么是时间轴？

`时间轴（Timeline）`是**补间动画的容器**。它是终极的排序工具，能让你将动画在时间上定位到你想要的任何位置，然后可以使用`暂停（pause()）`>)、`播放（play()）`>)、`进度（progress()）`>)、`倒放（reverse()）`>)、`时间缩放（timeScale()）`>)等方法轻松控制整个序列。

你可以创建任意数量的时间轴。你甚至可以**嵌套它们**，这对于模块化你的动画代码非常棒！每个动画（补间动画和时间轴）都被放置在一个父时间轴上（默认是`全局时间轴（globalTimeline）`>))。移动时间轴的播放头会级联到其子级，使播放头保持对齐。时间轴纯粹是关于分组和协调时间/播放头的——它实际上从不设置目标的属性（补间动画处理这个）。

```
                        播放头
|--------------时间轴-----|-----------|
|--补间动画1--|                |
           |-----补间动画2-----|-----------|
```

#### 创建时间轴的方法：

- `gsap.timeline()`

GSAP的API允许你即时控制几乎任何东西，比如播放头位置、任何子项的`开始时间（startTime）`，甚至播放/暂停/倒放时间轴或改变时间缩放本身。

## 在时间轴中安排顺序

首先，创建一个时间轴：

```js
var tl = gsap.timeline()
```

然后使用其中一个便捷方法——`to()`、`from()`或`fromTo()`添加一个补间动画：

```js
tl.to('.box', { duration: 2, x: 100, opacity: 0.5 })
```

你可以根据需要多次执行此操作。注意我们是在**时间轴实例上**调用`.to()`（在这个例子中是变量`tl`），而不是`gsap`对象。这会创建一个补间动画并立即将其放入特定的时间轴中。另一方面，`gsap.to()`创建一个独立的补间动画。默认情况下，动画将一个接一个地顺序排列。你甚至可以使用方法链来简化代码，如下所示：

```js
// 一个接一个地顺序排列
tl.to('.box1', { duration: 2, x: 100 }) // 注意这里没有分号！
  .to('.box2', { duration: 1, y: 200 })
  .to('.box3', { duration: 3, rotation: 360 })
```

**注意**：整个GSAP平台是面向对象的，例如，你可以使用`gsap.to()`创建单独的补间动画实例，然后使用`timeline.add()`逐个添加它们，但直接在时间轴实例上调用.to()、.from()或.fromTo()来做同样的事情步骤更少，更容易。

<iframe height="400" title="GSAP Basic Tween" src="https://codepen.io/GreenSock/embed/d0b24f699d5bee2305cb8223de580a62?default-tab=result&amp;theme-id=41164" frameborder="no" allowtransparency="true" allowfullscreen="" style="width: 100%;"></iframe>

## 使用位置参数控制放置

通过使用可选的位置参数，可以**精确地**定义你希望动画在时间轴中的放置位置。数字表示绝对时间（以秒为单位），带有`"+="`或`"-="`前缀的字符串表示相对于时间轴末尾的偏移量。例如，`"+=2"`表示在时间轴末尾后2秒，会创建一个2秒的间隔。`"-=2"`会创建一个2秒的重叠。

```js
// 从时间轴开始处精确地在1.5秒处开始：
tl.to(..., 1.5)
 .to(..., "-=0.75") // 重叠0.75秒
 .to(..., "+=1") // 在之前添加1秒的间隔
```

## 标签

使用标签在时间轴上标记某些位置，这样你可以在这些位置放置动画或在播放期间导航到这些位置。

```js
// 在正好3秒处添加一个标签
tl.addLabel("step2", 3)
 .to(..., "step2") // 在step2标签处开始
 .to(..., "step2 += 0.75") // 在step2标签后0.75秒

// 然后，我们可以使用seek()跳到该位置：
tl.seek("step2");
```

## 控制补间动画和时间轴

`补间动画（Tween）`和`时间轴（Timeline）`都扩展了一个动画类，该类公开了大量有用的方法和属性。以下是一些最常用的：

- `暂停（pause()）`
- `播放（play()）`
- `进度（progress()）`
- `重新开始（restart()）`
- `恢复（resume()）`
- `倒放（reverse()）`
- `跳转（seek()）`
- `时间（time()）`
- `持续时间（duration()）`
- `时间缩放（timeScale()）`
- `终止（kill()）`

你可以使用变量引用补间动画或时间轴实例，然后随时控制它：

```js
// 只有当你稍后想控制它时才需要创建变量...
var tween = gsap.to(...);
var tl = gsap.timeline(); // “tl”是时间轴的简称
tl.to(...).to(...); // 添加动画。

// 现在我们可以控制它们...
tween.pause();
tween.timeScale(2); // 双倍速度
tl.seek(3); // 跳到3秒处
tl.progress(0.5); // 到一半进度
...
```
