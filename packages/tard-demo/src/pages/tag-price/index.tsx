import React, { memo } from 'react';
import { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { SlTagPrice } from 'tard'
import DocsHeader from '../../components/doc-header'
import './index.less';

const TagPrice: FC = () => {
  return (
    <View className="container full-container">
      <DocsHeader title='TagPrice 价格标签'></DocsHeader>
      <View className='doc-body'>
        <View className='doc-body-content-tip'>基本用法</View>
        <View className='doc-body-content__info'>
          <SlTagPrice price="1.88" />
        </View>

        <View className='doc-body-content-tip'>自定义颜色</View>
        <View className='doc-body-content__info'>
          <SlTagPrice price="120" color="green" /> 
        </View>
        
        <View className='doc-body-content-tip'>自定义字体</View>
        <View className='doc-body-content__info'>
          <SlTagPrice price="120" size={28} /> 
        </View>
        
        <View className='doc-body-content-tip'>自定义标题</View>
        <View className='doc-body-content__info'>
          <SlTagPrice price="120" title="推广价"/> 
        </View>
      </View>
    </View>
  );
};

export default memo(TagPrice);