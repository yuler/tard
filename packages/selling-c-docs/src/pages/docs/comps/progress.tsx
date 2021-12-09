import MarkDown from '@/components/markdown'

const markdown = `# Propress
### 介绍
用于展示操作的当前进度。
### 引入
~~~js
import { SlProgress } from 'tard'
        
~~~
## 代码演示
### 基础用法
通过设置 percent 改变进度条数值 
~~~js
<SlProgress percent={30} />
~~~
### 自定义线条粗细
通过设置 strokeWidth 改变进度条粗细
~~~js
<SlProgress percent={30} strokeWidth={8} />
~~~
### 自定状态
通过设置 status 初始化不同状态进度条
~~~js
<SlProgress color="#FF2929" percent={70} status="error" />
~~~

### 自定文案
通过设置 pivotText 配置自定义文案
~~~js
<SlProgress percent={70} pivotText="700/1000" />
~~~

### 自定隐藏文案
通过设置 showPivot 可控制是否显示进度条文案
~~~js
<SlProgress percent={70} showPivot={false} />
~~~
## API
### Props
|  参数   | 说明  | 类型 | 默认值 |
|  ----  | ----  | ---- | ---- |
| percent | 进度百分比 | number | 0 |
| strokeWidth | 进度条粗细 | number | 4 |
| color | 进度条颜色 | string | #DC8D20 |
| trackColor | 轨道背景颜色 | string | #EFEFEF |
| pivotText | 文字 | string | - |
| showPivot | 是否显示文字 | boolean | true |
| status | 进度条状态 | 'progress' ｜ 'error' ｜ 'success' | - |

### 样式变量
|  属性   | 默认值 |
|  ----  | ---- |
| @slc-progress-height | 16px | 
| @slc-progress-text-size | @font-size-sm |
| @slc-progress-icon-size | @font-size-xl |
| @slc-progress-inner-bg-color | @color-grey-6 |
| @slc-progress-bar-bg-color | #78A4F4 |
| @slc-progress-bar-bg-color-active | @color-white |


`

export default function DocsPage() {
  return (
    <MarkDown markdown={ markdown } />
  );
}