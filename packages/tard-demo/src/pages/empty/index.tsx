import React, { memo } from 'react';
import { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { SlEmpty, SlButton } from 'tard'
import DocsHeader from '../../components/doc-header'
import './index.less';

const Empty: FC = () => {
  return (
    <View className="container full-container">
      <DocsHeader title='Empty'></DocsHeader>
      <View className='doc-body'>
        <View className='doc-body-content-tip'>只展示图片</View>
        <View className='doc-body-content__info'>
          <SlEmpty src="http://storage.360buyimg.com/hishop-images/bumblebee-mobile/hsresult/no-wifi.png" />
        </View>
        

        <View className='doc-body-content-tip'>图文显示</View>
        <View className='doc-body-content__info'>
          <SlEmpty
            text="网络错误"
            src="http://storage.360buyimg.com/hishop-images/bumblebee-mobile/hsresult/no-wifi.png" 
          />
        </View>
        

        <View className='doc-body-content-tip'>信息展示+ 按钮反馈</View>
        <View className='doc-body-content__info'>
          <SlEmpty
            text="网络错误"
            src="http://storage.360buyimg.com/hishop-images/bumblebee-mobile/hsresult/no-wifi.png"
            btnText="重试"
          />
        </View>
        

        <View className='doc-body-content-tip'>自定义按钮样式</View>
        <View className='doc-body-content__info'>
          <SlEmpty
            text="网络错误"
            src="http://storage.360buyimg.com/hishop-images/bumblebee-mobile/hsresult/no-wifi.png"
          >
            <SlButton className='selfBtn' radius={20} borderColor='pink' color='pink'>点我试试</SlButton>
          </SlEmpty>
        </View>
        
      </View>
    </View>
  );
};

export default memo(Empty);