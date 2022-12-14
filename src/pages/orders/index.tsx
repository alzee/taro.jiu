import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtList, AtListItem, AtCard, AtButton } from "taro-ui"
import { AtNavBar } from 'taro-ui'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { AtFab } from 'taro-ui'
import Taro from '@tarojs/taro'
import { Env } from '../../env/env'
import { fmtDate } from '../../fmtDate'

export default class Orders extends Component<PropsWithChildren> {
  pageCtx = Taro.getCurrentInstance().page
  role: int;
  tabList = []
  orgid: int
  cid: int

  componentWillMount () { }

  create(type: int){
    let page: string
    switch (type) {
      case 1:
        page = 'orderNew'
        break
      case 10:
        page = 'returnNew'
        break
      case 2:
        page = 'retailNew'
        break
      case 20:
        page = 'retailReturnNew'
        break
      case 3:
        page = 'dineNew'
        break
    }
    Taro.navigateTo({url: '/pages/' + page + '/index'})
  }

  getData (type: string) {
    const self = this;
    let query: string
    let api: string
    let filter: string
    let title: string
    let extraText: string
    let me = this.orgid
    switch (type) {
      case 'sales':
        api = 'orders'
        filter = 'exists%5BorderItems%5D=true&seller'
        extraText = 'voucher'
        break
      case 'returnsToMe':
        api = 'returns'
        filter = 'exists%5BreturnItems%5D=true&recipient'
        extraText = 'voucher'
        break
      case 'buys':
        api = 'orders'
        filter = 'exists%5BorderItems%5D=true&buyer'
        extraText = 'voucher'
        break
      case 'myReturns':
        api = 'returns'
        filter = 'exists%5BreturnItems%5D=true&sender'
        extraText = 'voucher'
        break
      case 'retails':
        api = 'retails'
        filter = 'store'
        extraText = 'voucher'
        break
      case 'retailReturns':
        api = 'retail_returns'
        filter = 'store'
        extraText = 'voucher'
        break
      case 'dines':
        api = 'order_restaurants'
        filter = 'restaurant'
        extraText = 'voucher'
        break
      case 'myDines':
        api = 'order_restaurants'
        filter = 'consumer'
        extraText = 'voucher'
        me = this.cid
        break
      case 'myRetails':
        api = 'retails'
        filter = 'consumer'
        extraText = 'voucher'
        me = this.cid
        break
    }
    Taro.request({
      url: Env.apiUrl + api + '?page=1&' + filter + '=' + me,
      success: function (res) { self.setState({data: res.data}) }
    }).then((res) =>{
      let list = []
      for (let i in res.data){
        switch (type) {
          case 'dines':
            title = res.data[i].consumer.name
            break
          case 'myDines':
            title = res.data[i].restaurant.name
            break
          case 'myRetails':
            title = res.data[i].store.name
            break
          case 'retails':
            title = res.data[i].product.name + ' x ' + res.data[i].quantity
            break
          case 'retailReturns':
            title = res.data[i].product.name + ' x ' + res.data[i].quantity
            break
          case 'sales':
            title = res.data[i].buyer.name
            break
          case 'buys':
            title = res.data[i].orderItems[0].product.name + ' x ' + res.data[i].orderItems[0].quantity + ' ...'
            break
          case 'myReturns':
            title = res.data[i].returnItems[0].product.name + ' x ' + res.data[i].returnItems[0].quantity + ' ...'
            break
          case 'returnsToMe':
            title = res.data[i].sender.name
            break
          default:
          title = '??????: ' + res.data[i].id
        }
        list.push(
          <AtListItem
          onClick={() => this.navToDetail(res.data[i].id, type)}
          title={title}
          note={fmtDate(res.data[i].date)}
          extraText={res.data[i][extraText] / 100}
          arrow='right'
          />
        )
      }
      this.setState({[type]: list})
    })
  }

  navToDetail(id: int, type: string){
    let page: string
    if (type == 'sales' || type == 'buys') {
      page = 'orderDetail'
    }
    if (type == 'returnsToMe' || type == 'myReturns') {
      page = 'returnDetail'
    }
    if (type == 'retails') {
      page = 'retailDetail'
    }
    if (type == 'retailReturns') {
      page = 'retailReturnDetail'
    }
    if (type == 'dines') {
      page = 'dineDetail'
    }
    if (type == 'myRetails') {
      page = 'retailDetail'
    }
    if (type == 'myDines') {
      page = 'dineDetail'
    }
    Taro.navigateTo({url: '/pages/' + page + '/index?id=' + id})
  }
  
  componentDidMount () {
    const self = this;
    Taro.getStorage({
      key: Env.storageKey,
      success: res => {
        self.setState({data: res.data})
        this.role = res.data.role
        if (this.role == -1) {
          Taro.redirectTo({ url: '/pages/chooseLogin/index' })
        } else if (this.role != 4){
          this.orgid = res.data.org.id
        } else {
          this.cid = res.data.cid
        }
        switch (this.role) {
          case 0:
            this.tabList = [{ title: '????????????' }, {title: '????????????'}]
            this.getData('sales')
            this.getData('returnsToMe')
            break
          case 1:
            this.tabList = [{ title: '????????????' }, { title: '????????????' }, {title: '????????????'}, {title: '????????????'}]
            this.getData('buys')
            this.getData('sales')
            this.getData('myReturns')
            this.getData('returnsToMe')
            break
          case 2:
            this.tabList = [{title: '????????????'}, {title: '????????????'}, {title: '????????????'}, {title: '????????????'}]
            this.getData('buys')
            this.getData('myReturns')
            this.getData('retails')
            this.getData('retailReturns')
            break
          case 3:
            this.tabList = [{title: '????????????'}, {title: '????????????'}, {title: '????????????'}, {title: '????????????'}, {title: '????????????'}]
            this.getData('buys')
            this.getData('myReturns')
            this.getData('retails')
            this.getData('retailReturns')
            this.getData('dines')
            break
          case 4:
            this.tabList = [{title: '????????????'}, {title: '????????????'}]
            this.getData('myRetails')
            this.getData('myDines')
            break
        }
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () {
    if (this.role == -1) {
      Taro.redirectTo({ url: '/pages/chooseLogin/index' })
    }
  }

  componentDidHide () { }

  scan(type: int){
    let page: string
    switch (type) {
      case 0:
        page = 'retailNew'
        break
      case 10:
        page = 'retailReturnNew'
        break
      case 1:
        page = 'dineNew'
        break
    }
    Taro.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        let text = res.result
        console.log(text)
        if (text.charCodeAt(0) === 0xFEFF) {
          text = text.substr(1);
        }
        console.log(text)
        let data = JSON.parse(text)
        console.log(data)
        Taro.navigateTo({url: '/pages/' + page + '/index?cid=' + data.cid + '&timestamp=' + data.timestamp + '&name=' + data.name})
      }
    })
  }

  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
    }
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  render () {
    return (
      <View className='orders'>

      { this.role == 0 &&
      <AtTabs scroll className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtButton className='new-btn' type='secondary' size='small' onClick={() => this.create(1)}>????????????</AtButton>
          <AtList className="list">
          {this.state.sales}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
          <AtButton className='new-btn' type='secondary' size='small' onClick={() => this.create(10)}>??????????????????</AtButton>
          <AtList className="list">
          {this.state.returnsToMe}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }

      { this.role == 1 &&
      <AtTabs scroll className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          {this.state.buys}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
          <AtButton className='new-btn' type='secondary' size='small' onClick={() => this.create(1)}>????????????</AtButton>
          <AtList className="list">
          {this.state.sales}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2} >
          <AtList className="list">
          {this.state.myReturns}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={3} >
          <AtButton className='new-btn' type='secondary' size='small' onClick={() => this.create(10)}>??????????????????</AtButton>
          <AtList className="list">
          {this.state.returnsToMe}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }

      { this.role == 2 &&
      <AtTabs scroll className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          {this.state.buys}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
          <AtList className="list">
          {this.state.myReturns}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2} >
          <AtButton className='new-btn' type='secondary' size='small' onClick={() => this.scan(0)}>????????????</AtButton>
          <AtList className="list">
          {this.state.retails}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={3} >
          <AtButton className='new-btn' type='secondary' size='small' onClick={() => this.scan(10)}>??????????????????</AtButton>
          <AtList className="list">
          {this.state.retailReturns}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }

      { this.role == 3 &&
      <AtTabs scroll className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          {this.state.buys}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
          <AtList className="list">
          {this.state.myReturns}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2} >
          <AtButton className='new-btn' type='secondary' size='small' onClick={() => this.scan(0)}>????????????</AtButton>
          <AtList className="list">
          {this.state.retails}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={3} >
          <AtButton className='new-btn' type='secondary' size='small' onClick={() => this.scan(10)}>??????????????????</AtButton>
          <AtList className="list">
          {this.state.retailReturns}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={4} >
          <AtButton className='new-btn' type='secondary' size='small' onClick={() => this.scan(1)}>??????????????????</AtButton>
          <AtList className="list">
          {this.state.dines}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }

      { this.role == 4 &&
      <AtTabs scroll className='first' current={this.state.current} tabList={this.tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <AtList className="list">
          {this.state.myRetails}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1} >
          <AtList className="list">
          {this.state.myDines}
          </AtList>
        </AtTabsPane>
      </AtTabs>
      }

      </View>
    )
  }
}
