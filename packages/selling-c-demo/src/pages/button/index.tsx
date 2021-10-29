import React, { memo } from 'react';
import { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { SlButton } from '@test/selling-c-ui'
import DocsHeader from '../../components/doc-header'
import './index.less';

const Button: FC = () => {
  return (
    <View className="container">
      <DocsHeader title='Button'></DocsHeader>
      <View className='doc-body'>
        <View className='doc-body-header'>button</View>
        <SlButton>sdf</SlButton>
      </View>
    </View>
  );
};

export default memo(Button);