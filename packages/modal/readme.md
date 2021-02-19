### modal

#### 组件
<zh-modal></zh-modal>

#### props 

 参数  | 说明 | 类型 | 默认值 | 版本 
 ---- | ---- | ---- | ---- | ---- 
 appendToBody | 是否添加至根结点 | Boolean | true | 1.0.0
 buttonType | 确认按钮类型 | String | primary | 1.0.0
 cancelText | 取消按钮文字 | String | 确认 | 1.0.0
 confirmDisable | 确认按钮是否禁用 | Boolean | false | 1.0.0
 confirmText | 确认按钮文字 | String | 取消 | 1.0.0
 enableAnimation | 是否启用内容展示\收起动画 | Boolean | true | 1.0.0
 modal | 是否展示modal蒙层 | Boolean | true | 1.0.0
 modalClosable | 点击modal蒙层是否关闭modal | Boolean | false | 1.0.0
 showClose | 是否显示右上角关闭图标 | Boolean | true | 1.0.0
 showFooter | 是否显示footer，设置footer插槽后该属性不起作用 | Boolean | true | 1.0.0
 showHeader | 是否显示footer,设置header插槽后该属性不起作用 | Boolean | true | 1.0.0
 title | 默认展示的header信息，设置header插槽后该属性不起作用 | String | ' ' | 1.0.0
 titleStyle | 默认展示内置header-title时自定义样式，设置header插槽后该属性不起作用 | Object | {} | 1.0.0
 visible/visible.sync | 控制modal显示隐藏 | Boolean | false | 1.0.0
 width | modal-content 内容展示宽度，设置时需要带有对应的单位，例如：‘350px’，'2.4rem'，'40%' | String | '40%' | 1.0.0

#### slot 

  - v-slot:header header插槽-自定义头部title信息
  - v-slot:footer footer插槽-自定义按钮部分信息

#### 事件

  - confirm 确认按钮点击事件 
  - close 取消按钮和右上角关闭按钮事件