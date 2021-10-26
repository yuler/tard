import React from 'react'
import cn from 'classnames'
import { View, Text } from '@tarojs/components'
import Common from '../../common/common'
import { SlPriceProps, SlPriceState } from '../../../types/sl-price'

export default class SlPrice extends React.Component<SlPriceProps, SlPriceState> {
  public static defaultProps: SlPriceProps

  // 价格处理
  private arrayPrice = (price) => {
    const { fixedNum } = this.props
    if (price instanceof Array && price.length > 1) {
      const arr = price.map(v => Number(v)).sort((a, b) => a - b)
      return `${Number(arr[0]).toFixed(fixedNum)}-${Number(arr[arr.length - 1]).toFixed(fixedNum)}`
    }
    return Number(price).toFixed(fixedNum)
  }

  // eslint-disable-next-line no-undef
  public render (): JSX.Element | null {
    const { 
      price, className, color, commissionPrice, trigger,
      originalColor, originalPrice, fixedNum, type, size = 0, 
      symbolSize
    } = this.props
    return (
      <Common className={ cn('slc-price', className) }>
        <View 
          className={
            cn('slc-price__text',{
              'slc-price__text-large': type === 'large',
              'slc-price__text-middle': type === 'largeMiddle' || type === 'smallMiddle',
              'slc-price__text-small': type === 'small' || type === 'middle',
            })
          }
          style={ (color !== '' ? `color: ${color}` : '') + (size !== 0 ? `font-size: ${size}rpx` : '') }
        >
          ¥
          <Text 
            className={
              cn('slc-price__text-content', {
                'slc-price__content-large': type === 'large',
                'slc-price__content-large-middle': type === 'largeMiddle',
                'slc-price__content-middle': type === 'middle',
                'slc-price__content-small-middle': type === 'smallMiddle',
                'slc-price__content-small': type === 'small',
              })
            }
            style={ symbolSize !== 0 ? `font-size: ${symbolSize}rpx` : '' }
          >
            { this.arrayPrice(price) }
          </Text>
          {
            originalPrice !== '' && 
            <Text 
              className="slc-price__origin-price" 
              style={ `color: ${ originalColor }` }
            >
              ¥{ Number(originalPrice).toFixed(fixedNum) }
            </Text>
          }
        </View>
        {
          trigger !== '' && trigger
        }
        {
          (commissionPrice !== '' && trigger === '') && 
          <View className="slc-price__commission">
            <View className="slc-price__commission--box">
              佣金 { commissionPrice }
            </View>
          </View>
        }
      </Common>
    )
  }
}

SlPrice.defaultProps = {
  className: '',
  price: '',
  fixedNum: 2,
  color: '',
  trigger: '',
  commissionPrice: '',
  originalColor: '',
  originalPrice: '',
  type: 'middle',
  size: 0,
  symbolSize: 0
}