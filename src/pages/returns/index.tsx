import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCard } from "taro-ui"
import { AtNavBar } from 'taro-ui'
import Taro from '@tarojs/taro'

export default class Returns extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick () {
    Taro.navigateBack()
  }

  render () {
    return (
      <View className='returns'>
        <AtNavBar
          onClickRgIconSt={this.handleClick}
          onClickRgIconNd={this.handleClick}
          onClickLeftIcon={this.handleClick}
          color='#000'
          leftIconType='chevron-left'
          fixed
        />
          <AtList className="list first">
          <AtListItem
          title='五粮液500ml'
          note='2022-09-05 19:05:05'
          extraText='已完成'
          />
          <AtListItem
          title='五粮液500ml'
          note='2022-09-05 19:05:05'
          extraText='已完成'
          />
          <AtListItem
          title='五粮液500ml'
          note='2022-09-05 19:05:05'
          extraText='已完成'
          />
          <AtListItem
          title='五粮液500ml'
          note='2022-09-05 19:05:05'
          extraText='已完成'
          />
          <AtListItem
          title='五粮液500ml'
          note='2022-09-05 19:05:05'
          extraText='已完成'
          />
          <AtListItem
          title='五粮液500ml'
          note='2022-09-05 19:05:05'
          extraText='已完成'
          />
          <AtListItem
          title='五粮液500ml'
          note='2022-09-05 19:05:05'
          extraText='已完成'
          />
          <AtListItem
          title='五粮液500ml'
          note='2022-09-05 19:05:05'
          extraText='已完成'
          />
          <AtListItem
          title='五粮液500ml'
          note='2022-09-05 19:05:05'
          extraText='已完成'
          />
          </AtList>
      </View>
    )
  }
}
