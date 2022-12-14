import { Component, PropsWithChildren } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'
import { AtButton, AtAvatar, AtIcon } from 'taro-ui'
import { AtSearchBar } from 'taro-ui'
import { AtNoticebar } from 'taro-ui'
import { AtActionSheet, AtActionSheetItem } from "taro-ui"
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'

export default class Index extends Component<PropsWithChildren> {
  pageCtx = Taro.getCurrentInstance().page
  apiUrl = Env.apiUrl;
  imgUrl = Env.imgUrl;
  state = {}
  //  constructor () {
  //    super(...arguments)
  //    this.state = {
  //    }
  //  }

  navToNode(id: int) {
    Taro.navigateTo({ url: '/pages/node/index?id=' + id })
  }

  componentDidMount () {
    const self = this;

    Taro.request({
      url: Env.apiUrl + 'nodes?page=1&itemsPerPage=3&tag=0&order%5Bid%5D=asc',
      success: function (res) { self.setState({nodes0: res.data}) }
    }).then((res) =>{
      let nodes = res.data
      let list = []
      for (let i in nodes) {
        list.push(
          <SwiperItem key={i}>
          <Image className='img' mode='scaleToFill' src={ this.imgUrl + 'node/' + nodes[i].img } onClick={()=>this.navToNode(nodes[i].id)}></Image>
          </SwiperItem>
        );
      }
      self.setState({list0: list})
    })

    Taro.request({
      url: Env.apiUrl + 'nodes?page=1&itemsPerPage=2&tag=1&order%5Bid%5D=asc',
      success: function (res) { self.setState({nodes1: res.data}) }
    }).then((res) =>{
      let nodes = res.data
      let list = []
      for (let i in nodes) {
        list.push(
          <View className="featured" key={i}>
          <Image className='img' mode='widthFix' src={this.imgUrl + 'node/' + nodes[i].img} onClick={()=>this.navToNode(nodes[i].id)} ></Image>
          <Text className="text">
          </Text>
          </View>
        );
      }
      self.setState({list1: list})
    })
  }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>

      <Swiper
      className='swiper'
      indicatorColor='#999'
      indicatorActiveColor='#333'
      circular
      indicatorDots
      autoplay>
      {this.state.list0}
      </Swiper>

      <View className='at-row highlight'>
      <View className="at-col" onClick={() => Taro.navigateTo({url: '/pages/about/index'})}>
      <AtAvatar className="avatar" circle image={Env.imgUrl + 'jiannan.png'}></AtAvatar>
      <Text>????????????</Text>
      </View>
      <View className="at-col" onClick={() => Taro.switchTab({url: '/pages/org/index'})}>
      <AtAvatar className="avatar" circle image={Env.imgUrl + 'store.png'}></AtAvatar>
      <Text>????????????</Text>
      </View>
      <View className="at-col" onClick={() => Taro.switchTab({url: '/pages/org/index'})}>
      <AtAvatar className="avatar" circle image={Env.imgUrl + 'dine.png'}></AtAvatar>
      <Text>????????????</Text>
      </View>
      </View>

      {this.state.list1}

      </View>
    )
  }
}
