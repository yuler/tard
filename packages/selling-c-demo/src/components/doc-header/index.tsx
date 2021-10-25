import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { SlIcon } from '@jd/selling-c-ui'
import { View } from '@tarojs/components'
import './index.less'

export interface DocsHeaderProps {
  title?: string
}

export default class DocsHeader extends React.Component<DocsHeaderProps> {
  public static defaultProps: DocsHeaderProps
  public static propTypes: InferProps<DocsHeaderProps>

  public render(): JSX.Element {
    const { title } = this.props

    return (
      <View className='doc-header'>
        <View className='doc-header__title'>
          <a href='#/pages/home/index'>
            <SlIcon value='chevron-left'></SlIcon>
          </a>
          {title}
        </View>
      </View>
    )
  }
}

DocsHeader.defaultProps = {
  title: '标题'
}

DocsHeader.propTypes = {
  title: PropTypes.string
}