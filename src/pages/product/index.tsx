import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { AtList, AtListItem, AtCard, AtButton } from "taro-ui"

export default class Product extends Component<PropsWithChildren> {
  pageCtx = Taro.getCurrentInstance().page
  role: int
  orgid: int
  state = {}

  navToDetail(id){
    Taro.navigateTo({url: '/pages/productDetail/index?id=' + id})
  }

  componentDidMount () {
    const self = this;
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        self.setState({data: res.data})
        this.orgid = res.data.org.id
        this.role = res.data.role
        let query = '?page=1&org=' + this.orgid
        Taro.request({
          url: Env.apiUrl + 'products' + query,
        }).then((res) =>{
          let list = []
          for (let i in res.data) {
            list.push(
              <AtListItem
              onClick={() => this.navToDetail(res.data[i].id)}
              title={res.data[i].name}
              note={'规格: ' + res.data[i].spec + ' 库存: ' + res.data[i].stock}
              // extraText={'库存: ' + res.data[i].stock}
              arrow='right'
              thumb={Env.imgUrl + 'product/' + res.data[i].img}
          />
            )
          }
          this.setState({list: list})
        })
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  render () {
    return (
      <View className='product'>
      { this.role == 0 &&
      <AtButton className='new-btn' type='secondary' size='small' onClick={() => Taro.redirectTo({url: '/pages/productNew/index'})}>添加产品</AtButton>
      }
      <AtList>
      { this.state.list }
      </AtList>
      </View>
    )
  }
}
