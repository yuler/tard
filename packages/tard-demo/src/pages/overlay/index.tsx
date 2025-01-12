import React, { memo, useState } from 'react';
import { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { SlOverlay, SlIcon } from 'tard'
import DocsHeader from '../../components/doc-header'
import './index.less';

const Overlay: FC = () => {
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)

  return (
    <View className="container">
      <DocsHeader title='Overlay 遮罩层'></DocsHeader>
      <View className='doc-body'>

        <View className='doc-body-content-tip'>基本用法</View>
        <View className='comp-items' onClick={() => setShow(true)}>
          <View className="comp-item-text">基本用法</View>
          <SlIcon value="chevron-right" color="#333" size={16} />
        </View>
        <SlOverlay show={show} onClick={() => setShow(false)} />

        <View className='doc-body-content-tip'>嵌入内容</View>
        <View className='comp-items' onClick={() => setShow1(true)}>
          <View className="comp-item-text">嵌入内容</View>
          <SlIcon value="chevron-right" color="#333" size={16} />
        </View>
        <SlOverlay show={show1} onClick={() => setShow1(false)}>
          <View style="display: flex; align-items: center; justify-content: center; height: 100%;" >
            <View style='width:200px; height:200px; background: #fff'></View>
          </View>
        </SlOverlay>

      </View>
    </View>
  );
};

export default memo(Overlay);