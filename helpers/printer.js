import { Alert, } from 'react-native'
import { BluetoothManager, BluetoothEscposPrinter, } from 'react-native-bluetooth-escpos-printer';
import { BleManager as BluManager } from "react-native-ble-plx"
import BleManager from 'react-native-ble-manager';
import BackgroundTimer from 'react-native-background-timer';
import { setBluetoothDevices } from '@reducers/TempReducer'
import store from '@store'

const manager = new BluManager()

BleManager.start({ showAlert: false }).then(() => {
  // Success code
  console.log("Module initialized");
});

import { getFormattedDate, } from '@dateFormatter'
import { reject } from 'lodash';

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


const printOptionsTotal = {
  ...printOptions,
  widthtimes: 1,
  heigthtimes: 1,
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

export const handleSize = (size) => {
  if (size === 'S') {
    return 'мал.'
  }
  if (size === 'M') {
    return 'сер.'
  }
  if (size === 'L') {
    return 'вел.'
  }
  if (size === 'XL') {
    return 'XL'
  }
}

export async function printNewBuffer(receipt) {
  try {
    const currentStore = store.getState()

    const { accounts, currentAccount, settings, } = currentStore.user
    const { currentRoute, } = currentStore.temp

    await BleManager.scan([], 5, true)

    const devices = await BleManager.getBondedPeripherals([]);

    const printer = devices.find(item => item.name && item.name.split(' ').map(elem => elem.toLowerCase()).includes('printer'))

    const alreadyConnected = await BleManager.isPeripheralConnected(printer.id, [])

    console.log('alreadyConnected', alreadyConnected, printer)

    if (printer && !alreadyConnected) {
      await BluetoothManager.connect(printer.id)
    }

    const kitchenReceipts = receipt.receipt.filter(item => item.department === 'kitchen')
    const paydeskReceipts = receipt.receipt.filter(item => item.department === 'paydesk')

    await BluetoothEscposPrinter.printerLineSpace(75)
    await BluetoothEscposPrinter.setWidth(400)

    if (kitchenReceipts.length !== 0 && settings.kitchen_enabled) {
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
          await printColumn([parceCyrrilicText((item.size && item.size !== '') ? `${item.title}, ${handleSize(item.size)}` : item.title), ``, ``, `${item.diff ? item.diff : item.quantity} шт`], { paddingLeft: 2 }, 'buffer')
          await printRegularLine('', { spaces: 1, paddingLeft: 2 })
        })
      }

      await printRegularLine('---------------------------------------------', { spaces: 1, paddingLeft: 2 })

      await printRegularLine('', { spaces: 4, })

      await cutLine()
    }

    if (paydeskReceipts.length !== 0 && settings.desk_enabled) {
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
          await printColumn([parceCyrrilicText((item.size && item.size !== '') ? `${item.title}, ${handleSize(item.size)}` : item.title), ``, ``, `${item.diff ? item.diff : item.quantity} шт`], { paddingLeft: 2 }, 'buffer')
          await printRegularLine('', { spaces: 1, paddingLeft: 2 })
        })
      }

      await printRegularLine('---------------------------------------------', { spaces: 1, paddingLeft: 2 })

      await printRegularLine('', { spaces: 4, })

      await cutLine()
    }
  } catch (error) {
    Alert.alert('Принтер не підключено')
    throw new Error()
    console.log(error.message)
  }
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export async function printReceipt(receipt, address) {
  try {
    const currentStore = store.getState()

    const { currentAccount, } = currentStore.user
    // const { bluetoothDevices, } = currentStore.temp

    const { receipt_name, receipt_description } = currentAccount

    await BleManager.scan([], 5, true)

    const devices = await BleManager.getBondedPeripherals([]);

    const printer = devices.find(item => item.name && item.name.split(' ').map(elem => elem.toLowerCase()).includes('printer'))

    const alreadyConnected = await BleManager.isPeripheralConnected(printer.id, [])

    if (printer && !alreadyConnected) {
      await BluetoothManager.connect(printer.id)
    }

    await BluetoothEscposPrinter.printerInit()

    await BluetoothEscposPrinter.printerLineSpace(80)
    await BluetoothEscposPrinter.printerUnderLine(0)

    await BluetoothEscposPrinter.setBlob(0)

    await printHeading(parceCyrrilicText(receipt_name.toUpperCase()), { spaces: 1, })

    await BluetoothEscposPrinter.printerLineSpace(75)

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

    await BluetoothEscposPrinter.printerLineSpace(20)

    await printRegularLine('---------------------------------------------', { spaces: 1, paddingLeft: 2 })

    await BluetoothEscposPrinter.setBlob(5)

    await printColumn(['Продукт', 'Цiна', 'К-сть', 'Сума'], { paddingLeft: 2 })

    await BluetoothEscposPrinter.setBlob(0)

    await BluetoothEscposPrinter.printerLineSpace(75)

    await printRegularLine('---------------------------------------------', { spaces: 1, paddingLeft: 2 })

    if (receipt) {
      await asyncForEach(receipt.receipt, async (item, index) => {
        await printColumn([parceCyrrilicText((item.size && item.size !== '') ? `${item.title}, ${handleSize(item.size)}` : item.title), `${item.price}`, `x${item.quantity}`, `${item.price * item.quantity}`], { paddingLeft: 2 })

        await printRegularLine('', { spaces: 1, paddingLeft: 2 })

        // if(item.size && item.size !== '') {
        //   await printColumn([parceCyrrilicText(`${handleSize(item.size)}`), ``, ``, ``], { paddingLeft: 2 })
        // }
      })
    }

    if (receipt && receipt.discount !== '0%') {
      await printRegularLine('---------------------------------------------', { spaces: 1, paddingLeft: 2 })

      await printColumn(['', '', 'Всього:', `${receipt ? receipt.initial : '0'} грн`], { spaces: 1, paddingLeft: 2 }, 'total')

      await printColumn(['', '', 'Знижка:', `-${parceCyrrilicText(receipt.discount)}`], { spaces: 1, paddingLeft: 2 }, 'total')
    }

    await BluetoothEscposPrinter.printerLineSpace(30)

    await printRegularLine('---------------------------------------------', { spaces: 2, paddingLeft: 2 })

    await printColumn(['', '', 'До сплати:', `${receipt ? receipt.total : '0'} грн`], { paddingLeft: 2 }, 'total')

    await printRegularLine('---------------------------------------------', { spaces: 1, paddingLeft: 2 })

    // await printRegularLine('Щоб лишити вiдгук проскануйте QR-код', { spaces: 1, paddingLeft: 2 }, BluetoothEscposPrinter.ALIGN.CENTER)
    // await printRegularLine('або перейдiть за посиланням', { spaces: 1, paddingLeft: 2 }, BluetoothEscposPrinter.ALIGN.CENTER)
    // await printRegularLine('https://adoo.com.ua/poilka/feedback', { spaces: 2, paddingLeft: 2 }, BluetoothEscposPrinter.ALIGN.CENTER)

    // await printQRCode('Бажаємо вам всього найкращого від команди Poilka :)')

    // await printRegularLine('', { spaces: 1, })

    // await printRegularLine('Дякуємо', { spaces: 1, }, BluetoothEscposPrinter.ALIGN.CENTER)
    // await printRegularLine('за ваше замовлення!', { spaces: 1, }, BluetoothEscposPrinter.ALIGN.CENTER)

    await BluetoothEscposPrinter.printerLineSpace(70)

    await printRegularLine('', { spaces: 4, })

    await cutLine()
  } catch (error) {
    Alert.alert('Принтер не підключено')
    console.log(error.message)
    throw new Error()
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

  await BluetoothEscposPrinter.printAndFeed(0);

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
    if (firstColumn.length > 17) {
      await print([calculatePaddingLeft(paddingLeft) + firstColumn.slice(0, 18), secondColumn, thirdColumn, lastColumn], { paddingLeft: 2 })

      if (firstColumn.length <= 54) {
        await print([calculatePaddingLeft(paddingLeft) + firstColumn.slice(18).trim(), '', '', ''], { paddingLeft: 2 })
      } else {
        await print([calculatePaddingLeft(paddingLeft) + firstColumn.slice(18, 36).trim(), '', '', ''], { paddingLeft: 2 })
        await print([calculatePaddingLeft(paddingLeft) + firstColumn.slice(36).trim(), '', '', ''], { paddingLeft: 2 })
      }
    } else {
      await print([calculatePaddingLeft(paddingLeft) + firstColumn, secondColumn, thirdColumn, lastColumn], { paddingLeft: 2 })
    }
  }
}

const performColumnPrint = async (values) => {
  let columnWidths = [23, 10, 6, 8];
  await BluetoothEscposPrinter.printColumn(
    columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
    values,
    printOptions
  );
}

const performTotalColumnPrint = async (values) => {
  let columnWidths = [2, 8, 11, 10];
  await BluetoothEscposPrinter.printColumn(
    columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
    values,
    printOptionsTotal
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
  // const dispatch = store.dispatch
  
  // try {
  //   const scanResult = await BluetoothManager.scanDevices()

  //   const parsed = JSON.parse(scanResult)

  //   const paired = parsed.paired
  //   const found = parsed.found

  //   console.log('-----------<>', paired, found)

  //   dispatch(setBluetoothDevices([...paired.map(item => ({ ...item, connected: true })), ...found.map(item => ({ ...item, connected: false }))]))
  // } catch (error) {
  //   console.log(error)
  // }
}

export async function connectToDevice(address) {
  try {
    await BleManager.connect(address)

    console.log('CONNECTED ----->')

    // await scanDevices()
  } catch (error) {
    Alert.alert(error.message)
    console.log(error.message)
  }
}

export async function unpairDevice(address) {
  try {
    // await BleManager.removeBond(address)
    await BluetoothManager.unpaire(address)

    console.log('DISCONNECTED ----->')

    // await scanDevices()
  } catch (error) {
    Alert.alert(error.message)
    console.log(error.message)
  }
}