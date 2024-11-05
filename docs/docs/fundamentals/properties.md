# gsap.effects()

### 类型：对象

一旦一个效果已经被[注册](<(/docs/v3/GSAP/gsap.registerEffect())>)，你可以像这样在`gsap.effects`对象上直接访问它：

```javascript
// 假设一个名为“explode”的效果已经被注册

gsap.effects.explode('.box', {
  direction: 'up', // 可以引用作者定义的任何属性——在这个例子中是“direction”
  duration: 3
})
```

或者，如果你在注册效果时将`extendTimeline`设置为`true`，你甚至可以直接在时间轴上调用它，以便将效果的结果插入到该时间轴中（见下文）。效果使得任何人都可以轻松地编写包装在一个函数（接受`targets`和一个`config`对象）中的自定义动画代码，然后将其与一个特定的`name`相关联，这样就可以在任何时候使用新的目标和配置来调用它。例如，也许我们想要能够让物体淡入淡出（这有点傻，因为它太简单了，但这里的目标是展示它是如何工作的）：

```javascript
// 向GSAP注册效果：
gsap.registerEffect({
  name: 'fade',
  effect: (targets, config) => {
    return gsap.to(targets, { duration: config.duration, opacity: 0 })
  },
  defaults: { duration: 2 }, // 默认值会应用到传递给效果的任何“config”对象
  extendTimeline: true // 现在你可以直接在任何GSAP时间轴上调用这个效果，使结果立即插入到你定义的位置（默认是在末尾顺序排列）
})

// 现在我们可以像这样使用它：
gsap.effects.fade('.box')

// 或者直接在时间轴上：
let tl = gsap.timeline()
tl.fade('.box', { duration: 3 }).fade('.box2', { duration: 1 }, '+=2').to('.box3', { x: 100 })
```

<iframe height="400" title="GSAP Basic Tween" src="https://codepen.io/GreenSock/embed/MWgmQmM?default-tab=result&amp;theme-id=41164" frameborder="no" allowtransparency="true" allowfullscreen="" style="width: 100%;"></iframe>

####

GSAP在这里提供了4项关键服务：

- 它将“目标”解析为一个数组。所以如果传入的是选择器文本，它会变成一个传递给效果函数的元素数组。
- 它每次都会将默认值应用到配置对象。不需要添加一堆`if`语句或者自己应用默认值。
- 如果你将`extendTimeline`设置为`true`，效果的名称将作为一个方法添加到GSAP的时间轴原型中，这意味着你可以将该效果的一个实例直接插入到任何时间轴中，如下所示：

```javascript
// 当extendTimeline为true时
var tl = gsap.timeline()
tl.yourEffect('.class', { configProp: 'value' }, '+=position')

// 当extendTimeline不为true时，你需要这样将一个实例添加到时间轴：
tl.add(gsap.effects.yourEffect('.class', { configProp: 'value' }), '+=position')
```

所以如果你在你的序列中大量使用一个效果，这可以为你节省大量的输入。**重要**：任何`extendTimeline`为`true`的效果**必须**返回一个与GSAP兼容的、可以插入到时间轴中的动画（一个补间动画或时间轴实例）。

- 它提供了一种集中式的方式来注册/访问这些“效果”。

效果在不同的项目和人员之间也很容易共享。要查看已经创建的效果，可以查看[这个CodePen集合](https://codepen.io/collection/bdffa09755cbd27a69b22771bd98e565/)。

以下是一个生成多个预制淡入淡出效果以便稍后重用的示例：

<iframe height="400" title="GSAP Basic Tween" src="https://codepen.io/GreenSock/embed/Rwajpyb?default-tab=result&amp;theme-id=41164" frameborder="no" allowtransparency="true" allowfullscreen="" style="width: 100%;"></iframe>
