import React, { useState, useRef, useEffect, useMemo, Fragment, } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated, Easing, FlatList, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import styles from './styles'
import Collapsible from 'react-native-collapsible'
import BackgroundTimer from 'react-native-background-timer';
import { printReceipt, } from '@printer'

import SharedButton from '@shared/SharedButton'

import { deviceWidth, deviceHeight } from '@dimensions';
import { getDiff, getUpperCaseDate, getFormattedDate, } from '@dateFormatter'
import { setReceiptEditState, setSelectedReceipt, setEditedReceiptId, setEditedReceiptPayload, } from '@reducers/OrdersReducer'

import ReceiptModal from './ReceiptModal'

function HistoryList(props) {
  const { data = [], loading, setLoadingStatus, } = props

  const timerRef = useRef(null)

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const historyParams = useSelector(state => state.temp.historyParams)

  const [expandedIndex, setExpandedIndex] = useState(null)
  const [receiptModalItem, setReceiptModalItem] = useState(false)
  const [receiptModalOpened, setReceiptModalVisibility] = useState(false)
  const [receiptModalState, setReceiptModalState] = useState(false)
  const [spinValue] = useState(new Animated.Value(1))
  const [showScrollTopButton, setScrollTopButtonVisibility] = useState(false)

  const scrollRef = useRef(null)

  const handleExpand = (index) => {
    if (expandedIndex === index) {
      Animated.timing(
        spinValue,
        {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
        }
      ).start()

      setExpandedIndex(null)
    } else {
      Animated.timing(
        spinValue,
        {
          toValue: 0.5,
          duration: 300,
          easing: Easing.ease,
        }
      ).start()

      scrollRef.current.scrollTo({ x: 0, y: index * 70 })

      setExpandedIndex(index)
    }
  }

  const AnimatedImage = Animated.createAnimatedComponent(FastImage)

  const hideReceiptModal = () => {
    setReceiptModalVisibility(false)

    BackgroundTimer.setTimeout(() => {
      setReceiptModalState(null)

      clearTimeout(timerRef.current)
    }, 300)
  }

  const reprintReceipt = async (receipt) => {
    await printReceipt(receipt)
  }

  const handleEditReceipt = (receipt) => {
    dispatch(setSelectedReceipt(0))
    dispatch(setReceiptEditState(receipt.receipt))
    dispatch(setEditedReceiptId(receipt.hash_id))
    dispatch(setEditedReceiptPayload(receipt))
    navigation.jumpTo('SalesLayout')
  }

  useEffect(() => {
    setExpandedIndex(null)
  }, [historyParams])

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={{ paddingHorizontal: 40, paddingBottom: 300 }}
      scrollToOverflowEnabled
      scrollEnabled={expandedIndex === null}
      scrollEventThrottle={100}
    >
      {(data && data.length > 0) ? data.map((receipt, index) => {
        const spin = spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        })

        return (
          <Fragment key={index}>
            <TouchableOpacity
              style={styles.dayHeader}
              onPress={() => handleExpand(index, 0)}
              activeOpacity={1}
            >
              <View style={{ alignItems: 'center', justifyContent: 'center', width: 70, height: '100%', }}>
                <FastImage
                  style={{ width: 22, height: 22, }}
                  source={require('@images/session_process.png')}
                />
              </View>
              <Text style={styles.dayHeaderTotal}>{getUpperCaseDate('HH:mm:ss', receipt.transaction_time_end)}</Text>
              <Text
                style={[styles.dayHeaderTotal, { width: '32%', }]}
                ellipsizeMode={'tail'}
                numberOfLines={1}
              >
                {receipt.receipt.map(item => item.title).join(', ') || 0}
              </Text>
              <Text style={styles.dayHeaderTotal}>Сума: {receipt.total || 0} грн</Text>
              <Text style={styles.dayHeaderTotal}>{receipt.employee || '-'}</Text>
              <View style={styles.dayHeaderIcon}>
                <AnimatedImage
                  style={[{ width: 15, height: 15 }, expandedIndex === index && { transform: [{ rotate: spin }] }]}
                  source={require('@images/down-arrow.png')}
                />
              </View>
            </TouchableOpacity>
            <Collapsible style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', }} collapsed={expandedIndex !== index}>
              <View style={{ width: '60%', paddingHorizontal: 25, height: deviceHeight * 0.345, borderRightWidth: 1, borderRightColor: '#F2F2F2' }}>
                <View style={styles.receiptLeftButtons}>
                  <TouchableOpacity
                    style={styles.receiptLeftButton}
                    onPress={reprintReceipt}
                    activeOpacity={0.7}
                  >
                    <FastImage
                      style={{ width: 22, height: 22, }}
                      source={require('@images/tprinter.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.receiptLeftButton}
                    activeOpacity={0.7}
                  >
                    <FastImage
                      style={{ width: 22, height: 22, }}
                      source={require('@images/qr-code.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.receiptLeftButton}
                    onPress={() => { return; handleEditReceipt(receipt) }}
                    activeOpacity={0.7}
                  >
                    <FastImage
                      style={{ width: 18, height: 18, }}
                      source={require('@images/edit_filled.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.receiptRightContainer}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginRight: 30, }}>
                      <Text style={[styles.receiptSummaryText, { maxWidth: deviceWidth * 0.15, }]} numberOfLines={1} ellipsizeMode='tail'>#{receipt.hash_id}</Text>
                      <Text style={styles.receiptSummaryText}>Тип оплати: {receipt.payment_type === 'cash' ? 'Готівка' : 'Картка'}</Text>
                      <Text style={styles.receiptSummaryText}>Час оплати: {getUpperCaseDate('HH:mm:ss', receipt.transaction_time_end)}</Text>
                    </View>
                    <View>
                      <Text style={styles.receiptSummaryText}>До сплати: {receipt.initial} грн</Text>
                      <Text style={styles.receiptSummaryText}>Внесено: {receipt.input} грн</Text>
                      <Text style={styles.receiptSummaryText}>Знижка: {receipt.discount}</Text>
                      <Text style={styles.receiptSummaryText}>Решта: 0 грн</Text>
                    </View>

                    {/* <Text style={styles.receiptSummaryText}>Працівник: {receipt.employee}</Text> */}
                  </View>
                </View>
              </View>
              <View style={{ width: '40%', }}>
                <ScrollView
                  style={{ height: deviceHeight * 0.25, width: '100%', }}
                  contentContainerStyle={{ padding: 20, }}
                  persistentScrollbar
                >
                  <Text style={styles.receiptSummaryText}>Зміст чеку:</Text>

                  {receipt.receipt.map(item => (
                    <View style={{ width: '100%', borderBottomWidth: 1.5, borderBottomColor: '#F2F2F2', marginBottom: 10, }}>
                      <Text style={[styles.receiptSummaryReceiptText, { marginBottom: 5, }]}>{item.title}{item.size ? ', ' + item.size : ''}</Text>
                      <Text style={styles.receiptSummaryReceiptText}>@{item.price}, - {item.quantity} шт - {item.price * item.quantity} грн</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </Collapsible>
          </Fragment>
        )
      }) : (
          <View style={{ position: 'absolute', top: deviceHeight * 0.3, alignSelf: 'center', alignItems: 'center', }}>
            <Text style={styles.emptyHeadingText}>Чеки не знайдено</Text>
            <Text style={styles.emptyText}>Перевірте інтернет з'єднання або наявність змін за {getUpperCaseDate('DD.MM') === getUpperCaseDate('DD.MM', historyParams.date) ? 'сьогодні' : getUpperCaseDate('DD.MM', historyParams.date)}</Text>
          </View>
        )}

      <ReceiptModal
        isVisible={receiptModalOpened}
        receiptModalItem={receiptModalItem}
        receiptModalState={receiptModalState}
        hideReceiptModal={hideReceiptModal}
      />
    </ScrollView>
  )
}

export default HistoryList


//   < RecyclerListView
// style = { styles.container }
// rowRenderer = {(type, day, key) => {
//   if (!day) return null

//   const employeesLength = day.employees ? day.employees.length : 0
//   const sessionOrdersQty = day.receipts.length
//   const sessionTotal = day.receipts.reduce((accumulator, currentValue) => accumulator + currentValue.total, false)

//   return (
//     <Fragment key={key}>
//       <TouchableOpacity
//         style={styles.dayHeader}
//         onPress={() => {
//           if (day.receipts.length === 0) return
//           setModalState(true)
//           setSelectedReceipt(day.receipts)
//         }}
//         activeOpacity={1}
//       >
//         <FastImage
//           style={{ width: 20, height: 20, marginRight: 28, }}
//           source={require('@images/session_process.png')}
//         />
//         <Text style={styles.dayHeaderDate}>{getUpperCaseDate('dddd DD.MM | HH:mm', day.startTime)}</Text>
//         <Text style={styles.dayHeaderTotal}>Всього: {sessionTotal || 0} грн</Text>
//         <Text style={styles.dayHeaderTotal}>К-сть операцій: {sessionOrdersQty}</Text>
//         {/* <Text style={styles.dayHeaderEmployees}>Працівників на зміні: {employeesLength}</Text> */}
//         <View style={styles.dayHeaderIcon}>
//           <AnimatedImage
//             style={[{ width: 15, height: 15, transform: [{ rotate: '270deg' }] }]}
//             source={require('@images/down-arrow.png')}
//           />
//         </View>
//       </TouchableOpacity>
//     </Fragment>
//   )
// }}
// dataProvider = { dataProvider.cloneWithRows([...data, { receipts: [], employees: [] }]) }
// layoutProvider = { layoutProvider }
// // layoutSize={deviceHeight * 0.4}
// scrollViewProps = {{
//   contentContainerStyle: { paddingBottom: 100, },
//   showsVerticalScrollIndicator: false,
//         }}
// />

//   < Modal
// visible = { modalVisible }
// modalStyle = { styles.modalComponent }
// overlayBackgroundColor = { 'rgba(0, 0, 0, 0.85)'}
// onTouchOutside = { closeMenu }
// disableOnBackPress = { false}
// onHardwareBackPress = { closeMenu }
// modalAnimation = {
//   new SlideAnimation({
//     slideFrom: 'bottom',
//   })
// }
//   >

//   <ModalContent>
//     <View>
//       <Text style={styles.heading}>{selectedReceipt ? getUpperCaseDate('dddd DD.MM | HH:mm', selectedReceipt.startTime) === getUpperCaseDate('dddd DD.MM | HH:mm', new Date()) ? getUpperCaseDate('Сьогодні після HH:mm', selectedReceipt.startTime) : getUpperCaseDate('dddd DD.MM | HH:mm', selectedReceipt.startTime) : null}</Text>
//     </View>
//     <ScrollView style={{ width: '100%', height: deviceHeight * 0.725, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#F3F3F3' }}>
//       {selectedReceipt && selectedReceipt.reverse().map((item) => (
//         <View>
//           <View style={{ width: '100%', paddingHorizontal: 20, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
//             <Text style={[styles.collapsedReceiptContenHeading, { fontSize: 25, }]}>{getFormattedDate('HH:mm', item.transaction_time_end)}</Text>
//           </View>

//           <View style={styles.historyInstance}>
//             <View style={{ marginRight: 5, }}>
//               <SharedButton
//                 style={{ marginTop: -15, width: 69, height: 69, }}
//                 onPress={() => showReceiptModal('qr', item)}
//                 scale={0.8}
//               >
//                 <FastImage
//                   style={{ width: '26%', height: '26%', }}
//                   source={require('@images/qr-code.png')}
//                 />
//               </SharedButton>
//               <SharedButton
//                 style={{ marginTop: -15, width: 69, height: 69, }}
//                 onPress={() => reprintReceipt(item)}
//                 scale={0.8}
//               >
//                 <FastImage
//                   style={{ width: '26%', height: '26%', }}
//                   source={require('@images/tprinter.png')}
//                 />
//               </SharedButton>
//             </View>


//             <View style={styles.collapsedReceiptContent}>
//               <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', }}>
//                 <Text style={styles.collapsedReceiptContenHeading}>Зміст:</Text>
//               </View>

//               {item.receipt.map((elem, id) => (
//                 <Text style={styles.receiptItem} key={id}>{elem.title} x{elem.quantity} - {elem.price * elem.quantity} грн</Text>
//               ))}
//             </View>

//             <View style={{ width: '62%', padding: 10, }}>
//               <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, }}>
//                 <Text style={styles.receiptDetailHeading}>Тип оплати: <Text style={styles.receiptDetailContent}>{item.payment_type === 'cash' ? 'Готівка' : 'Картка'}</Text></Text>
//                 <Text style={styles.receiptDetailHeading}>Внесено: <Text style={styles.receiptDetailContent}>{item.receipt.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), false)} грн</Text></Text>
//               </View>

//               <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, marginTop: 20, }}>
//                 <Text style={styles.receiptDetailHeading}>Час транзакції: <Text style={styles.receiptDetailContent}>{getFormattedDate('HH:mm', item.transaction_time_end)}</Text></Text>
//                 <Text style={styles.receiptDetailHeading}>До сплати: <Text style={styles.receiptDetailContent}>{item.receipt.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), false)} грн</Text></Text>
//               </View>

//               <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, marginTop: 20, }}>
//                 <Text style={styles.receiptDetailHeading}>Час оформлення: <Text style={styles.receiptDetailContent}>
//                   {renderTimeSpent(item.first_product_time, item.transaction_time_end)}
//                 </Text></Text>
//                 <Text style={styles.receiptDetailHeading}>Решта: <Text style={styles.receiptDetailContent}>{item.change} грн</Text></Text>
//               </View>

//               <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 16, marginTop: 20, }}>
//                 <Text style={styles.receiptDetailHeading}>Працівник: <Text style={styles.receiptDetailContent}>{item.employee}</Text></Text>
//                 <Text style={styles.receiptDetailHeading}>Знижка: <Text style={styles.receiptDetailContent}>{item.discount}</Text></Text>
//               </View>

//               {item.comment !== '' && (
//                 <View style={{ width: '100%', marginTop: 20, }}>
//                   <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 17, }}>
//                     <Text style={styles.receiptDetailHeadingComment}>Коментар: <Text style={styles.receiptDetailContent}>{item.comment}</Text></Text>
//                   </View>
//                 </View>
//               )}
//             </View>
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   </ModalContent>
//       </ >

//   <ReceiptModal
//     isVisible={receiptModalOpened}
//     receiptModalItem={receiptModalItem}
//     receiptModalState={receiptModalState}
//     hideReceiptModal={hideReceiptModal}
//   />