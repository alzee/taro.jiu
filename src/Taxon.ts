export const Taxon = {
  status: [
    '待处理',
    '',
    '',
    '',
    '已拒绝',
    '已完成',
  ],
  orgType: [
    '总公司',
    '代理商',
    '门店',
    '餐厅',
    '顾客',
  ],
  voucherType: [
  ]
}

Taxon.voucherType[0] = '进货'
Taxon.voucherType[3] = '购酒'
Taxon.voucherType[5] = '退货接收'
Taxon.voucherType[10] = '提现兑付'
Taxon.voucherType[12] = '顾客餐饮消费'
Taxon.voucherType[13] = '零售退货'
Taxon.voucherType[100] = '发货'
Taxon.voucherType[103] = '酒零售'
Taxon.voucherType[105] = '退货发出'
Taxon.voucherType[110] = '申请提现'
Taxon.voucherType[112] = '餐饮消费'
Taxon.voucherType[113] = '酒退货'
Taxon.voucherType[255] = '内部调控'
