import React, { Fragment } from 'react'
import cn from 'classnames'
import { View, Text } from '@tarojs/components'
import { pxTransform } from '../../common/utils'
import Common from '../../common/common'
import { SlPriceProps, SlPriceState } from '../../../types/price'

export default class SlPrice extends React.Component<SlPriceProps, SlPriceState> {
  public static defaultProps: SlPriceProps

  private saveMax = (getPrice) => {
    const price = Number(getPrice);
    if (String(price).indexOf('.') === -1) {
      return price;
    }
    let str = ''
    str += String(price).split('.')[0];
    const floatPrice = String(price).split('.')[1];
    if (Number(floatPrice) === 0) {
      str += '';
    } else if (Number(floatPrice) < 10) {
      str += '.' + String(price).split('.')[1];
    } else {
      if (Number(floatPrice)%10 !== 0) {
        str += '.' + String(Number(floatPrice));
      } else {
        str += '.' + String(Number(floatPrice)).substr(0, 1);
      }
    }
    return str
  };

  private filterPrice = (price) => {
    const { fixedNum, thousands } = this.props
    if (fixedNum === -1) {
      return thousands ? this.thousandsFilter(this.saveMax(price)) : this.saveMax(price)
    }
    return thousands ? this.thousandsFilter(Number(price).toFixed(fixedNum)) : Number(price).toFixed(fixedNum)
  }

  // 千分位处理
  private thousandsFilter = (price) => {
    const reg = /\d{1,3}(?=(\d{3})+$)/g
    const returnPrice = String(price).replace(/^(\d+)((\.\d+)?)$/, (_, s1, s2) => s1.replace(reg, '$&,') + s2)
    return returnPrice
  }

  // 价格处理
  private arrayPrice = (price) => {
    const { 
      type, symbolSize = 0, unitSize = 0, priceUnit, showAfterSymbol
    } = this.props
    if (price instanceof Array && price.length > 1) {
      const arr = price.map(v => Number(v)).sort((a, b) => a - b)
      return (
        <Fragment>
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
            style={ symbolSize !== 0 ? `font-size: ${pxTransform(symbolSize)}` : '' }
          >
            { String(this.filterPrice(arr[0])).split('.')[0] }
          </Text>
          { String(this.filterPrice(arr[0])).split('.')[1] ? '.' + String(this.filterPrice(arr[0])).split('.')[1] : '' }
          <Text className='slc-price__text-line'>-</Text>
          {
            showAfterSymbol && <Text style={ unitSize === 0 ? '': `font-size: ${pxTransform(unitSize)}` }>{priceUnit}</Text>
          }
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
            style={ symbolSize !== 0 ? `font-size: ${pxTransform(symbolSize)}` : '' }
          >
            { String(this.filterPrice(arr[arr.length - 1])).split('.')[0] }
          </Text>
          { String(this.filterPrice(arr[arr.length - 1])).split('.')[1] ? '.' + String(this.filterPrice(arr[arr.length - 1])).split('.')[1] : '' }
        </Fragment>
      )
    }
    return  (
      <Fragment>
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
          style={ symbolSize !== 0 ? `font-size: ${pxTransform(symbolSize)}` : '' }
        >
          { String(this.filterPrice(price)).split('.')[0] }
        </Text>
        { String(this.filterPrice(price)).split('.')[1] ? '.' + String(this.filterPrice(price)).split('.')[1] : '' }
      </Fragment>
    )
  }

  // eslint-disable-next-line no-undef
  public render (): JSX.Element | null {
    const { 
      price, className, color, commissionPrice, afterContent,
      originColor, originPrice, type, size = 0, beforeContent,
      priceUnit, unitSize = 0
    } = this.props
    return (
      <Common className={ cn('slc-price', className) }>
        {
          beforeContent !== '' && beforeContent
        }
        <View 
          className={
            cn('slc-price__text',{
              'slc-price__text-large': type === 'large',
              'slc-price__text-middle': type === 'largeMiddle' || type === 'smallMiddle',
              'slc-price__text-small': type === 'small' || type === 'middle',
            })
          }
          style={ (color !== '' ? `color: ${color};` : '') + (size !== 0 ? `font-size: ${pxTransform(size)}` : '') }
        >
          <Text style={ unitSize === 0 ? '': `font-size: ${pxTransform(unitSize)}` }>{priceUnit}</Text>
          { this.arrayPrice(price) }
          {
            originPrice !== '' && 
            <Text 
              className="slc-price__origin-price" 
              style={ `color: ${ originColor }` }
            >
             <Text>{priceUnit}</Text>
             { this.filterPrice(originPrice) }
            </Text>
          }
        </View>
        {
          afterContent !== '' && afterContent
        }
        {
          (commissionPrice !== '' && afterContent === '') && 
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
  fixedNum: -1,
  color: '',
  afterContent: '',
  beforeContent: '',
  commissionPrice: '',
  originColor: '',
  originPrice: '',
  type: 'middle',
  size: 0,
  symbolSize: 0,
  showAfterSymbol: false,
  priceUnit: '¥',
  unitSize: 0,
  thousands: false
}
