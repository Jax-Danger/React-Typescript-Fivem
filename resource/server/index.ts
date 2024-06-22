import config from '../../config/config'

onNet('purchaseItems:success', (method: string, item: string, quantity: number, price: number) => {
  const source = global.source
  const findItemName = config.shops.items.find((i: any) => i.label === item)
  if (findItemName) {
    console.log(findItemName.name + ' WO')
    console.log('purchasing ' + quantity + ' ' + item + ' for $' + price + ' each using ' + method)
  } else return console.log('Item not found')

  if (method === 'cash') {
    console.log('removing cash')
    global.exports['MP-Base'].changeMoney(source, 'cash', price, 'del');
    emit('Inventory:AddItem', source, findItemName.name, quantity)
  } else if (method === 'bank') {
    global.exports['MP-Base'].changeMoney(source, 'bank', price, 'del');
    emit('Inventory:AddItem', source, findItemName.name, quantity)
    console.log('removing $' + price + ' from bank and adding ' + quantity + ' ' + item)
  }
})
