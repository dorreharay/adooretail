import { Alert, } from 'react-native'
import { BluetoothManager, BluetoothEscposPrinter, } from 'react-native-bluetooth-escpos-printer';
import { setBluetoothDevices } from '@reducers/TempReducer'
import store from '@store'

import { getFormattedDate, } from '@dateFormatter'

const printOptions = {
  encoding: 'CP866',
  codepage: 17,
  widthtimes: 0,
  heigthtimes: 0,
  fonttype: 0
}

const printOptionsHeading = {
  ...printOptions,
  widthtimes: 2,
  heigthtimes: 2,
  fonttype: 1
}

function parceCyrrilicText(text) {
  return (
    text
      .replace(/і/g, 'i')
      .replace(/І/g, 'I')
  )
}

const cutLine = async () => {
  await BluetoothEscposPrinter.cutOnePoint()
}

export async function printNewBuffer(receipt) {
  try {
    const kitchenReceipts = receipt.receipt.filter(item => item.department === 'kitchen')
    const paydeskReceipts = receipt.receipt.filter(item => item.department === 'paydesk')

    await BluetoothEscposPrinter.printerLineSpace(80)
    await BluetoothEscposPrinter.setWidth(400)

    if(kitchenReceipts.length !== 0) {
      await printHeading(parceCyrrilicText('Кухня'), { spaces: 2, })

      await printRegularLine(`Номер чека: #${receipt.hash_id.slice(0, 18).toUpperCase()}`, { spaces: 1, paddingLeft: 2 })
      await printRegularLine(`Друк: ${getFormattedDate('YYYY-MM-DD HH:mm:ss')}`, { spaces: 1, paddingLeft: 2 })
  
      await printRegularLine('---------------------------------------------', { spaces: 1, paddingLeft: 2 })
  
      async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      }
  
      if (kitchenReceipts) {
        await asyncForEach(kitchenReceipts, async (item) => {
          await printColumn([parceCyrrilicText(item.title), ``, ``, `${item.diff ? item.diff : item.quantity} шт`], { paddingLeft: 2 }, 'buffer')
        })
      }
  
      await printRegularLine('---------------------------------------------', { spaces: 1, paddingLeft: 2 })
  
      await printRegularLine('', { spaces: 6, })
  
      await cutLine()
    }

    if(paydeskReceipts.length !== 0) {
      await printHeading(parceCyrrilicText('Бар'), { spaces: 2, })

      await printRegularLine(`Номер чека: #${receipt.hash_id.slice(0, 18).toUpperCase()}`, { spaces: 1, paddingLeft: 2 })
      await printRegularLine(`Друк: ${getFormattedDate('YYYY-MM-DD HH:mm:ss')}`, { spaces: 1, paddingLeft: 2 })
  
      await printRegularLine('---------------------------------------------', { spaces: 1, paddingLeft: 2 })
  
      async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      }
  
      if (paydeskReceipts) {
        await asyncForEach(paydeskReceipts, async (item) => {
          await printColumn([parceCyrrilicText(item.title), ``, ``, `${item.diff ? item.diff : item.quantity} шт`], { paddingLeft: 2 }, 'buffer')
        })
      }
  
      await printRegularLine('---------------------------------------------', { spaces: 1, paddingLeft: 2 })
  
      await printRegularLine('', { spaces: 6, })
  
      await cutLine()
    }
  } catch (error) {
    Alert.alert('Принтер не налаштовано')
    console.log(error.message)
  }
}

export async function printReceipt(receipt, address) {
  try {
    if (address) {
      await BluetoothManager.connect(address)
    }

    const currentStore = store.getState()

    const { accounts, currentAccountToken, currentAccountIndex, } = currentStore.user
    const { currentRoute, } = currentStore.temp

    const currentAccount = accounts[currentAccountIndex]

    const { receipt_name, receipt_description } = currentAccount

    await BluetoothEscposPrinter.printerLineSpace(80)
    await BluetoothEscposPrinter.setWidth(400)

    await printHeading(parceCyrrilicText(receipt_name.toUpperCase()), { spaces: 1, })
    await printRegularLine(parceCyrrilicText(receipt_description), { spaces: 2, }, BluetoothEscposPrinter.ALIGN.CENTER)

    if (receipt) {
      await printRegularLine('м. Вiнниця вул. Грушевського 15', { spaces: 1, paddingLeft: 2 })
      await printRegularLine(`Номер чека: #${receipt.hash_id.slice(0, 18).toUpperCase()}`, { spaces: 1, paddingLeft: 2 })
      await printRegularLine(`Касир: ${parceCyrrilicText(receipt.employee)}`, { spaces: 1, paddingLeft: 2 })
      await printRegularLine(`Друк: ${receipt.transaction_time_end}`, { spaces: 1, paddingLeft: 2 })
      await printRegularLine(`Тип оплати: ${parceCyrrilicText(receipt.payment_type === 'card' ? 'Картка' : 'Готівка')}`, { spaces: 1, paddingLeft: 2 })
    } else {
      await printRegularLine('Тестова адреса', { spaces: 1, paddingLeft: 2 })
      await printRegularLine(`Номер чека: #тест`, { spaces: 1, paddingLeft: 2 })
      await printRegularLine(`Касир: Тест`, { spaces: 1, paddingLeft: 2 })
      await printRegularLine(`Друк: Тест`, { spaces: 1, paddingLeft: 2 })
      await printRegularLine(`Тип оплати: Тест`, { spaces: 1, paddingLeft: 2 })
    }

    await printRegularLine('---------------------------------------------', { spaces: 1, paddingLeft: 2 })

    await printColumn(['Продукт', 'Цiна', 'К-сть', 'Сума'], { paddingLeft: 2 })

    await printRegularLine('---------------------------------------------', { spaces: 1, paddingLeft: 2 })

    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }

    if (receipt) {
      await asyncForEach(receipt.receipt, async (item) => {
        await printColumn([parceCyrrilicText(item.title), `${item.price}`, `x${item.quantity}`, `${item.price * item.quantity}`], { paddingLeft: 2 })
      })
    }

    if (receipt && receipt.discount !== '0%') {
      await printRegularLine('---------------------------------------------', { spaces: 1, paddingLeft: 2 })

      await printColumn(['', '', 'Всього:', `${receipt ? receipt.initial : '0'} грн`], { spaces: 1, paddingLeft: 2 }, 'total')

      await printColumn(['', '', 'Знижка:', `-${parceCyrrilicText(receipt.discount)}`], { spaces: 1, paddingLeft: 2 }, 'total')
    }

    await printRegularLine('---------------------------------------------', { spaces: 1, paddingLeft: 2 })

    await printColumn(['', '', 'До сплати:', `${receipt ? receipt.total : '0'} грн`], { paddingLeft: 2 }, 'total')

    await printRegularLine('---------------------------------------------', { spaces: 2, paddingLeft: 2 })

    // await printRegularLine('Щоб лишити вiдгук проскануйте QR-код', { spaces: 1, paddingLeft: 2 }, BluetoothEscposPrinter.ALIGN.CENTER)
    // await printRegularLine('або перейдiть за посиланням', { spaces: 1, paddingLeft: 2 }, BluetoothEscposPrinter.ALIGN.CENTER)
    // await printRegularLine('https://adoo.com.ua/poilka/feedback', { spaces: 2, paddingLeft: 2 }, BluetoothEscposPrinter.ALIGN.CENTER)

    // await printQRCode('Бажаємо вам всього найкращого від команди Poilka :)')

    await printRegularLine('', { spaces: 1, })

    await printRegularLine('Дякуємо', { spaces: 1, }, BluetoothEscposPrinter.ALIGN.CENTER)
    await printRegularLine('за ваше замовлення!', { spaces: 1, }, BluetoothEscposPrinter.ALIGN.CENTER)

    await printRegularLine('', { spaces: 6, })

    await cutLine()
  } catch (error) {
    Alert.alert('Принтер не налаштовано')
    console.log(error.message)
  }
}

const calculateSpaces = (number) => {
  let empty = Array.from(Array(number).keys())
  empty = empty.map(() => '\n\r')

  return empty.join('')
}

const calculatePaddingLeft = (number) => {
  let empty = Array.from(Array(number).keys())
  empty = empty.map(() => ' ')

  return empty.join('')
}

const printHeading = async (text, options) => {
  const { spaces = 1, paddingLeft = 0 } = options

  const printValue = `${calculatePaddingLeft(paddingLeft)}${text}${calculateSpaces(spaces)}`

  await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
  await BluetoothEscposPrinter.printText(printValue, printOptionsHeading);
}

const printRegularLine = async (text, options, align) => {
  const { spaces = 1, paddingLeft = 0 } = options

  const printValue = `${calculatePaddingLeft(paddingLeft)}${text}${calculateSpaces(spaces)}`

  await BluetoothEscposPrinter.printerAlign(align ? align : BluetoothEscposPrinter.ALIGN.LEFT);
  await BluetoothEscposPrinter.printText(printValue, printOptions);
}

const printQRCode = async (text) => {
  await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
  await BluetoothEscposPrinter.printQRCode(text, 200, 2)
}

const printColumn = async (values, options, extraType) => {
  const { paddingLeft = 0 } = options

  const firstColumn = values[0]
  const secondColumn = values[1]
  const thirdColumn = values[2]
  const lastColumn = values[3]

  let print = performColumnPrint

  if (extraType && extraType === 'total') {
    print = performTotalColumnPrint
  }

  if (extraType && extraType === 'buffer') {
    print = performBufferColumnPrint
  }

  if (extraType && extraType === 'buffer') {
    if (firstColumn.length > 29) {
      await print([calculatePaddingLeft(paddingLeft) + firstColumn.slice(0, 29), secondColumn, thirdColumn, lastColumn], { paddingLeft: 2 })

      if (firstColumn.length <= 70) {
        await print([calculatePaddingLeft(paddingLeft) + firstColumn.slice(29).trim(), '', '', ''], { paddingLeft: 2 })
      } else {
        await print([calculatePaddingLeft(paddingLeft) + firstColumn.slice(29, 40).trim(), '', '', ''], { paddingLeft: 2 })
        await print([calculatePaddingLeft(paddingLeft) + firstColumn.slice(40).trim(), '', '', ''], { paddingLeft: 2 })
      }
    } else {
      await print([calculatePaddingLeft(paddingLeft) + firstColumn, secondColumn, thirdColumn, lastColumn], { paddingLeft: 2 })
    }
  } else {
    if (firstColumn.length > 11) {
      await print([calculatePaddingLeft(paddingLeft) + firstColumn.slice(0, 11), secondColumn, thirdColumn, lastColumn], { paddingLeft: 2 })

      if (firstColumn.length <= 22) {
        await print([calculatePaddingLeft(paddingLeft) + firstColumn.slice(11).trim(), '', '', ''], { paddingLeft: 2 })
      } else {
        await print([calculatePaddingLeft(paddingLeft) + firstColumn.slice(11, 22).trim(), '', '', ''], { paddingLeft: 2 })
        await print([calculatePaddingLeft(paddingLeft) + firstColumn.slice(22).trim(), '', '', ''], { paddingLeft: 2 })
      }
    } else {
      await print([calculatePaddingLeft(paddingLeft) + firstColumn, secondColumn, thirdColumn, lastColumn], { paddingLeft: 2 })
    }
  }
}

const performColumnPrint = async (values) => {
  let columnWidths = [16, 10, 11, 8];
  await BluetoothEscposPrinter.printColumn(
    columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
    values,
    printOptions
  );
}

const performTotalColumnPrint = async (values) => {
  let columnWidths = [10, 12, 12, 10];
  await BluetoothEscposPrinter.printColumn(
    columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
    values,
    printOptions
  );
}

const performBufferColumnPrint = async (values) => {
  let columnWidths = [32, 2, 2, 10];
  await BluetoothEscposPrinter.printColumn(
    columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
    values,
    printOptions
  );
}

export async function scanDevices() {
  const dispatch = store.dispatch

  try {
    const scanResult = await BluetoothManager.scanDevices()

    const devices = JSON.parse(scanResult)

    const found = devices.found
    const paired = devices.paired

    dispatch(setBluetoothDevices(devices))

    return { found, paired }
  } catch (error) {
    console.log(error)
  }
}

export async function performPrinterScanAndConnect() {
  const scanResult = await BluetoothManager.scanDevices()

  const devices = JSON.parse(scanResult)

  const { found, paired } = devices


  if (paired.length > 0) {
    await BluetoothManager.connect(paired[0].address)
  } else {
    // if(found.length > 0) {
    //   await BluetoothManager.connect(found[0].address)
    // }
  }
}

export async function connectToDevice(address) {
  try {
    await BluetoothManager.connect(address)

    await scanDevices()
  } catch (error) {
    Alert.alert(error.message)
    console.log(error.message)
  }
}

export async function unpairDevice(address) {
  try {
    await BluetoothManager.unpaire(address)

    await scanDevices()
  } catch (error) {
    Alert.alert(error.message)
    console.log(error.message)
  }
}