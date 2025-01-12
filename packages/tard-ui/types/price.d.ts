import SlComponent from './base'

export interface SlPriceProps extends SlComponent {
  /**
   * 价格
   */
  price?: string | string[]
  /**
   * 原价
   */
  originPrice?: string
  /**
   * 原价颜色
   */
  originColor?: string
  /**
   * 颜色
   */
  color?: string
  /**
   * 价格前面的内容
   */
  beforeContent?: React.ReactNode,
  /**
   * 价格后面的内容
   */
  afterContent?: React.ReactNode,
  /**
   * 是否展示佣金
   */
  commissionPrice?: string
  /**
   * 保留几位小数点
   */
  fixedNum?: number
  /**
   * 类型
   */
  type?: Size | string
  /**
   * 整体价格大小
   */
  size?: number
  /**
   * 只修改价格大小
   */
  symbolSize?: number
  /**
   * 价格为数组时是否展示后面单位
   */
  showAfterSymbol?: boolean
  /**
   * 价格单位
   */
  priceUnit?: string
  /**
   * 价格单位大小
   */
  unitSize?: number
  /**
   * 是否按照千分号形式显示
   */
  thousands?: boolean
}

enum Size {
  small = 'small',  // 24 + 24
  smallMiddle = 'smallMiddle', // 28 + 28
  middle = 'middle', // 24 + 36
  largeMiddle = 'largeMiddle', // 28 + 48
  large = 'large',  // 36 + 60
}

export interface SlPriceState {
}

declare const SlPrice: ComponentClass<SlPriceProps>

export default SlPrice