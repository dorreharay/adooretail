import { Alert, } from 'react-native'
import { BluetoothManager, BluetoothEscposPrinter, } from 'react-native-bluetooth-escpos-printer';
import { setBluetoothDevices } from '@reducers/TempReducer'
import store from '@store'

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

    console.log(currentAccount)

    await BluetoothEscposPrinter.printerLineSpace(80)
    await BluetoothEscposPrinter.setWidth(400)

    if (receipt) {
      await printRegularLine('м. Вiнниця вул. Грушевського 15', { spaces: 1, paddingLeft: 2 })
      await printRegularLine(`Номер чека: #${receipt.hash_id.slice(0, 18).toUpperCase()}`, { spaces: 1, paddingLeft: 2 })
      await printRegularLine(`Касир: ${parceCyrrilicText(receipt.employee)}`, { spaces: 1, paddingLeft: 2 })
      await printRegularLine(`Друк: ${receipt.transaction_time_end}`, { spaces: 1, paddingLeft: 2 })
    } else {
      await printRegularLine('Тестова адреса', { spaces: 1, paddingLeft: 2 })
      await printRegularLine(`Номер чека: #1234567`, { spaces: 1, paddingLeft: 2 })
      await printRegularLine(`Касир: Тест`, { spaces: 1, paddingLeft: 2 })
      await printRegularLine(`Друк: 1234567`, { spaces: 1, paddingLeft: 2 })
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

    await printRegularLine('---------------------------------------------', { spaces: 1, paddingLeft: 2 })

    await printColumn(['', '', 'До сплати', `${receipt ? receipt.total : '0'} грн`], { paddingLeft: 2 })

    await printRegularLine('---------------------------------------------', { spaces: 2, paddingLeft: 2 })

    // await printRegularLine('Щоб лишити вiдгук проскануйте QR-код', { spaces: 1, paddingLeft: 2 }, BluetoothEscposPrinter.ALIGN.CENTER)
    // await printRegularLine('або перейдiть за посиланням', { spaces: 1, paddingLeft: 2 }, BluetoothEscposPrinter.ALIGN.CENTER)
    // await printRegularLine('https://adoo.com.ua/poilka/feedback', { spaces: 2, paddingLeft: 2 }, BluetoothEscposPrinter.ALIGN.CENTER)

    // await printQRCode('Бажаємо вам всього найкращого від команди Poilka :)')

    await printRegularLine('', { spaces: 1, })

    await printRegularLine('Дякуємо', { spaces: 1, }, BluetoothEscposPrinter.ALIGN.CENTER)
    await printRegularLine('за ваше замовлення!', { spaces: 1, }, BluetoothEscposPrinter.ALIGN.CENTER)

    await printRegularLine('', { spaces: 6, })

    await printHeading(parceCyrrilicText(receipt_name.toUpperCase()), { spaces: 1, })
    await printRegularLine(parceCyrrilicText(receipt_description), { spaces: 2, }, BluetoothEscposPrinter.ALIGN.CENTER)
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

const printColumn = async (values, options) => {
  const { paddingLeft = 0 } = options

  const firstColumn = values[0]
  const secondColumn = values[1]
  const thirdColumn = values[2]
  const lastColumn = values[3]

  if (firstColumn.length > 11) {
    await performColumnPrint([calculatePaddingLeft(paddingLeft) + firstColumn.slice(0, 11), secondColumn, thirdColumn, lastColumn], { paddingLeft: 2 })


    if (firstColumn.length <= 22) {
      await performColumnPrint([calculatePaddingLeft(paddingLeft) + firstColumn.slice(11), '', '', ''], { paddingLeft: 2 })
    } else {
      await performColumnPrint([calculatePaddingLeft(paddingLeft) + firstColumn.slice(11, 22), '', '', ''], { paddingLeft: 2 })
      await performColumnPrint([calculatePaddingLeft(paddingLeft) + firstColumn.slice(22), '', '', ''], { paddingLeft: 2 })
    }
  } else {
    await performColumnPrint([calculatePaddingLeft(paddingLeft) + firstColumn, secondColumn, thirdColumn, lastColumn], { paddingLeft: 2 })
  }
}

const performColumnPrint = async (values) => {
  let columnWidths = [16, 10, 10, 8];
  await BluetoothEscposPrinter.printColumn(
    columnWidths, [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
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
  const { found, paired } = await scanDevices()


  if(paired.length > 0) {
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