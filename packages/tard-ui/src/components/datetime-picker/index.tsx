
import React, { Fragment, CSSProperties } from 'react'
import classNames from "classnames";
import { View, PickerView, PickerViewColumn } from '@tarojs/components'
import {CommonEvent} from "@tarojs/components/types/common";
import SlToast from "../toast/index"
import { getDateUTC } from "../../common/utils"
import { 
  getYears, getDays, getMonths, getHours, getMinutes
} from "../../common/dateMap"
import { pxTransform } from '../../common/utils'
import { SlDatetimePickerProps, SlDatetimePickerState } from '../../../types/datetime-picker'

export default class SlDatetimePicker extends React.Component<SlDatetimePickerProps, SlDatetimePickerState> {
  public static defaultProps: SlDatetimePickerProps
  public constructor(props: SlDatetimePickerProps) {
    super(props)

    const { visible, value = '', endValue = '', minDate, maxDate } = props
    const years = getYears(minDate, maxDate)
    const months = getMonths(this.getYear(value), minDate, maxDate) || []
    const days = getDays(this.getYear(value), this.getMonth(value), minDate, maxDate)
    const hours = getHours(this.getMonth(value), this.getDate(value), this.getYear(value), minDate, maxDate)
    const minutes = getMinutes(
      this.getMonth(value), this.getDate(value), this.getYear(value), this.getHour(value),
      minDate, maxDate
    )

    this.state = {
      _isOpened: visible,
      years,
      months,
      days,
      hours,
      minutes,
      year: this.getYear(value),
      yearEndTime: this.getYear(endValue),
      month: this.getMonth(value),
      monthEndTime: this.getMonth(endValue),
      day: this.getDate(value),
      dayEndTime: this.getDate(endValue),
      value: this.getTimeArray(value, this.props.type),
      valueEndTime: endValue ? this.getTimeArray(endValue, this.props.type) : [9999, 0, 0],
      active: 1, // 现在激活的tab
      showToast: false,
      hour: this.getHour(value),
      hourEndTime: this.getHour(endValue),
      minute: this.getMinute(value),
      minuteEndTime: this.getMinute(endValue),
    }
  }

  // 第一次进入判断
  private getTimeArray = (input: string, type = 'date') => {
    const date = new Date()
    if (type === 'time') {
      const { hours, minutes } = this.state
      const timeArray = [this.getHour(input), this.getMinute(input)]
      const hourIndex = hours.indexOf(+timeArray[0]) !== -1 ? hours.indexOf(+timeArray[0]) : 1
      const minuteIndex = minutes.indexOf(+timeArray[1]) !== -1 ? minutes.indexOf(+timeArray[1]) : 1
      return [hourIndex, minuteIndex]
    }
    const timeArray = [this.getYear(input), this.getMonth(input), this.getDate(input), this.getHour(input), this.getMinute(input)]
    const year = +timeArray[0] < date.getFullYear() ? +timeArray[0] : date.getFullYear()
    // @ts-ignore
    const yearIndex = +years.indexOf(year) !== -1 ? +years.indexOf(year) : years[years.length -1]
    // @ts-ignore
    const monthIndex = months.indexOf(+timeArray[1]) !== -1 ? months.indexOf(+timeArray[1]) : 1
    // @ts-ignore
    const dateIndex = days.indexOf(+timeArray[2]) !== -1 ? days.indexOf(+timeArray[2]) : 1
    if (type === 'datetime') {
      const { hours, minutes } = this.state
      // @ts-ignore
      const hourIndex = hours.indexOf(+timeArray[3]) !== -1 ? hours.indexOf(+timeArray[3]) : 1
      // @ts-ignore
      const minuteIndex = minutes.indexOf(+timeArray[4]) !== -1 ? minutes.indexOf(+timeArray[4]) : 1
      return [yearIndex, monthIndex, dateIndex, hourIndex, minuteIndex]
    }
    return [yearIndex, monthIndex, dateIndex]
  }

  private getYear = (input: string) => {
    return getDateUTC(input).getFullYear()
  }

  private getMonth = (input: string) => {
    return getDateUTC(input).getMonth() + 1
  }

  private getDate = (input: string) => {
    return getDateUTC(input).getDate()
  }

  private getHour = (input: string) => {
    return getDateUTC(input).getHours()
  }

  private getMinute = (input: string) => {
    return getDateUTC(input).getMinutes()
  }

  // 改变时间函数
  private onChange = (e) => {
    const { type, minDate, maxDate } = this.props
    const { hours, years, months, days, minutes } = this.state
    const val = e.detail.value
    if (type === 'time') {
      if (this.state.active === 1) {
        this.setState({
          hour: hours[val[0]],
          minute: minutes[val[1]],
          value: val,
        })
      } else {
        this.setState({
          hourEndTime: hours[val[0]],
          minuteEndTime: minutes[val[1]],
          value: val,
        })
      }
      return
    }
    const selectMonths = getMonths(years[val[0]], minDate, maxDate) || []
    const selectDays = getDays(years[val[0]], months[val[1]], minDate, maxDate)
    const selectHours = getHours(years[val[0]], months[val[1]], days[val[2]], minDate, maxDate)
    const selectMinutes = getMinutes(years[val[0]], months[val[1]], days[val[2]], hours[val[3]], minDate, maxDate)
    
    if (this.state.active === 1) {
      const obj = type === 'datetime' ? {
        hour: selectHours[val[3]],
        minute: selectMinutes[val[4]],
      } : {} as any
      this.setState({
        ...obj,
        year: years[val[0]],
        month: selectMonths[val[1]],
        day: selectDays[val[2]],
        months: selectMonths,
        days: selectDays,
        hours: selectHours,
        minutes: selectMinutes,
        value: val,
      })
    } else {
      const obj = type === 'datetime' ? {
        hourEndTime: selectHours[val[3]],
        minuteEndTime: selectMinutes[val[4]],
      } : {} as any
      this.setState({
        yearEndTime: years[val[0]],
        monthEndTime: selectMonths[val[1]],
        dayEndTime: selectDays[val[2]],
        valueEndTime: val,
        months: selectMonths,
        days: selectDays,
        hours: selectHours,
        minutes: selectMinutes,
        ...obj
      })
    }
  }

  public UNSAFE_componentWillReceiveProps(nextProps: SlDatetimePickerProps): void {
    const { visible, value = '', endValue = '', minDate, maxDate, type } = nextProps
    if (visible !== this.state._isOpened) {
      this.setState({
        _isOpened: visible
      })
    }
    if (type !== 'date') {
      this.setState({
        value: this.getTimeArray(value, type),
      })
    }
    if (value != this.props.value) {
      this.setState({
        year: this.getYear(value),
        month: this.getMonth(value),
        day: this.getDate(value),
        value: this.getTimeArray(value, type),
        hour: this.getHour(value),
        minute: this.getMinute(value),
      })
    }
    if (endValue != this.props.endValue) {
      this.setState({
        yearEndTime: this.getYear(endValue),
        monthEndTime: this.getMonth(endValue),
        dayEndTime: this.getDate(endValue),
        valueEndTime: endValue ? this.getTimeArray(endValue, type) : [9999, 0, 0],
        hourEndTime: this.getHour(endValue),
        minuteEndTime: this.getMinute(endValue),
      })
    }
    if (minDate != this.props.minDate || maxDate != this.props.maxDate) {
      const years = getYears(minDate, maxDate)
      const months = getMonths(this.getYear(value), minDate, maxDate) || []
      const days = getDays(this.getYear(value), this.getMonth(value), minDate, maxDate)
      const hours = getHours(this.getMonth(value), this.getDate(value), this.getYear(value), minDate, maxDate)
      const minutes = getMinutes(
        this.getMonth(value), this.getDate(value), this.getYear(value), this.getHour(value),
        minDate, maxDate
      )
      this.setState({
        years,
        months,
        days,
        hours,
        minutes,
      })
    }
  }

  // 点击mask关闭
  private outClick = () => {
    this.props.closeOnclickOverlay && this.close()
  }

  // 阻止冒泡
  private handleTouchMove = (e: CommonEvent): void => {
    e.stopPropagation()
  }

  // 关闭回调
  private handleClose = (): void => {
    if (typeof this.props.onClose === 'function') {
      this.props.onClose()
    }
  }

  // 确定函数函数
  private transDate = (input) => {
    if (input < 10) return `0${input}`
    return input
  }

  // 确认回调
  handleConfirm = () => {
    const { type } = this.props
    const timeArr: Array<string> = []
    let startTime = ''
    if (type === 'datetime') {
      startTime += `${this.state.year}-${this.transDate(this.state.month)}-${this.transDate(this.state.day)}`
      startTime += ` ${this.transDate(this.state.hour)}:${this.transDate(this.state.minute)}`
    } else if (type === 'date') {
      startTime += `${this.state.year}-${this.transDate(this.state.month)}-${this.transDate(this.state.day)}`
    } else {
      startTime += `${this.transDate(this.state.hour)}:${this.transDate(this.state.minute)}`
    }
    timeArr.push(startTime)
    if (this.props.showEndDate) {
      let endTime = `${this.state.yearEndTime}-${this.transDate(this.state.monthEndTime)}-${this.transDate(this.state.dayEndTime)}`
      if (type === 'datetime') {
        endTime = `${this.state.yearEndTime}-${this.transDate(this.state.monthEndTime)}-${this.transDate(this.state.dayEndTime)}`
        endTime += ` ${this.transDate(this.state.hourEndTime)}:${this.transDate(this.state.minuteEndTime)}`
      } else if (type === 'date') {
        endTime = `${this.state.yearEndTime}-${this.transDate(this.state.monthEndTime)}-${this.transDate(this.state.dayEndTime)}`
      } else {
        endTime += `${this.transDate(this.state.hourEndTime)}:${this.transDate(this.state.minuteEndTime)}`
      }
      timeArr.push(endTime)
    }
    if (typeof this.props.onOk === 'function') {
      this.props.onOk(timeArr)
    }
  }

  // 关闭函数
  private close = (): void => {
    this.setState(
      {
        _isOpened: false
      },
      this.handleClose
    )
  }

  // 确定函数函数
  private confirm = (): void => {
    if (this.props.showEndDate && this.getArrayTime('start') > this.getArrayTime('end')) {
      this.setState({showToast: true})
      return
    }
    this.setState({_isOpened: false}, this.handleConfirm)
  }

  // 点击tab页面
  private handleClickTab = (tab: any): void => {
    this.setState({
      active: tab,
    })
  }

  private getArrayTime (isDown) {
    if (isDown === 'start') {
      const { year, month, day, hour, minute } = this.state
      return new Date(`${year}/${month}/${day} ${hour}:${minute}`).getTime()
    } else {
      const { yearEndTime, monthEndTime, dayEndTime, hourEndTime, minuteEndTime } = this.state
      return new Date(`${yearEndTime}/${monthEndTime}/${dayEndTime} ${hourEndTime}:${minuteEndTime}`).getTime()
    }
  }

  // eslint-disable-next-line no-undef
  public render (): JSX.Element | null {
    const { type, round } = this.props
    const { _isOpened, hours, minutes } = this.state
    const rootClassMask = classNames(
      'slc-datetime__mask',
      {
        'slc-datetime__mask-active': _isOpened
      },
    )

    const containerClass = classNames(
      'slc-datetime__container',
      {
        'slc-datetime__container-active': _isOpened,
        'slc-datetime__container-round': round
      },
    )

    const tabLeftClass = classNames(
      'time-show-left',
      {
        'half': this.props.showEndDate,
        'active': this.state.active === 1
      },
    )

    const tabRightClass = classNames(
      'time-show-right',
      {
        'hidden': !this.props.showEndDate,
        'half': this.props.showEndDate,
        'active': this.state.active === 2
      },
    )

    const columnStyle = {
      'line-height': pxTransform(50),
      'text-align': 'center'
    } as CSSProperties

    return (
      <View 
        className="slc-datetime" 
        onTouchMove={this.handleTouchMove}
      >
        <View className={rootClassMask} onClick={this.outClick} />
        <View className={containerClass}>
          <View className="time-picker-container">
            <View className="time-show-container">
              <View className={tabLeftClass} onClick={ () => this.handleClickTab(1) }>
                <View className="time-show-left-title">{this.props.title}</View>
                <View className="time-show-left-content">
                  {
                    type !== 'time' &&
                    <Fragment>{this.state.year}.{this.transDate(this.state.month)}.{this.transDate(this.state.day)}</Fragment>
                  }
                  {
                    type !== 'date' && 
                    <Fragment> {this.transDate(this.state.hour)}:{this.transDate(this.state.minute)}</Fragment>
                  }
                </View>
              </View>
              <View className={tabRightClass} onClick={ () => this.setState({active: 2})}>
                <View className="time-show-left-title">{this.props.endTitle}</View>
                <View className="time-show-left-content">
                  {
                    type !== 'time' &&
                    <Fragment>{this.state.yearEndTime}.{this.transDate(this.state.monthEndTime)}.{this.transDate(this.state.dayEndTime)}</Fragment>
                  }
                  {
                    type !== 'date' && 
                    <Fragment> {this.transDate(this.state.hourEndTime)}:{this.transDate(this.state.minuteEndTime)}</Fragment>
                  }
                </View>
              </View>
            </View>
            <PickerView
              indicatorClass="picker-column"
              className="picker-row"
              value={ this.state.active === 1 ? this.state.value : this.state.valueEndTime }
              onChange={this.onChange}
            >
              {
                type !== 'time' &&
                <Fragment>
                  <PickerViewColumn
                    style={ columnStyle }
                  >
                    {this.state.years.map(item => {
                      return <View className="slc-datetime-picker__label">{item}年</View>;
                    })}
                  </PickerViewColumn>
                  <PickerViewColumn style={ columnStyle }>
                    {this.state.months.map(item => {
                      return <View className="slc-datetime-picker__label">{item}月</View>
                    })}
                  </PickerViewColumn>
                  <PickerViewColumn style={ columnStyle }>
                    {this.state.days.map(item => {
                      return <View className="slc-datetime-picker__label">{item}日</View>
                    })}
                  </PickerViewColumn>
                </Fragment>
              }
              {
                type !== 'date' && 
                <Fragment>
                  <PickerViewColumn style={ columnStyle }>
                    {hours.map(item => {
                      return <View className="slc-datetime-picker__label">{item}时</View>
                    })}
                  </PickerViewColumn>
                  <PickerViewColumn style={ columnStyle }>
                    {minutes.map(item => {
                      return <View className="slc-datetime-picker__label">{item}分</View>
                    })}
                  </PickerViewColumn>
                </Fragment>
              }
            </PickerView>
          </View>
          <View className="time-bottom">
            <View className="cancel-btn" onClick={ () => this.close() }>取消</View>
            <View className="confirm-btn" onClick={ () => this.confirm() }>确定</View>
          </View>
        </View>

        <SlToast
          visible={ this.state.showToast}
          text="结束时间不能小于开始时间"
          onClose={ () => this.setState({showToast: false})}
        />
      </View>
    )
  }
}

SlDatetimePicker.defaultProps = {
  showEndDate: false, // 默认不显示
  visible: false,
  closeOnclickOverlay: true, // 是否能点击遮罩层关闭
  title: '选中时间',
  endTitle: '结束时间',
  type: 'date',
  value: '',
  endValue: '',
  minDate: '1990-01-01',
  maxDate: `${new Date().getFullYear() + 5}-01-01`,
  round: false
}
