import React, { memo } from 'react';
import { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { SlToast } from '@test/selling-c-ui'
import DocsHeader from '../../components/doc-header'
import './index.less';

const Toast: FC = () => {
  return (
    <View className="container">
      <DocsHeader title='Toast'></DocsHeader>
      <View className='doc-body'>
        <View className='doc-body-header'>button</View>
      </View>
    </View>
  );
};

export default memo(Toast);