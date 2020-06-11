import React, { useState, useRef, useEffect, useMemo, Fragment, } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated, Easing, FlatList, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux'
import FastImage from 'react-native-fast-image'
import styles from './styles'
import Collapsible from 'react-native-collapsible'
import { printReceipt, } from '@printer'

import SharedButton from '@shared/SharedButton'

import { deviceWidth, deviceHeight } from '@dimensions';
import { getDiff, getUpperCaseDate, getFormattedDate, } from '@dateFormatter'
import { getSessions } from '@reducers/UserReducer'

import ReceiptModal from './ReceiptModal'

function HistoryList(props) {
  const { data = [], loading, setLoadingStatus, } = props

  const timerRef = useRef(null)

  const dispatch = useDispatch()

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

  const showReceiptModal = (type, receipt) => {
    setReceiptModalState(type)
    setReceiptModalItem(receipt.hash_id)
    setReceiptModalVisibility(true)
  }

  const hideReceiptModal = () => {
    setReceiptModalVisibility(false)

    timerRef.current = setTimeout(() => {
      setReceiptModalState(null)

      clearTimeout(timerRef.current)
    }, 300)
  }

  const renderTimeSpent = (startTime, endTime) => {
    let timeSpent = getDiff(endTime, startTime, 'seconds')

    if (timeSpent < 60) {
      return timeSpent + ' сек'
    } else {
      return getDiff(endTime, startTime, 'minutes') + ' хв'
    }
  }

  const reprintReceipt = async (receipt) => {
    await printReceipt(receipt)
  }

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={{ paddingHorizontal: 40, }}
      scrollToOverflowEnabled
      scrollEnabled={expandedIndex === null}
      onScroll={(e) => {
        setScrollTopButtonVisibility(e.nativeEvent.contentOffset.y > 50)
      }}
      scrollEventThrottle={100}
    >
      {data && data.map((receipt, index) => {
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
            <Collapsible collapsed={expandedIndex !== index}>
              <View style={{ flexDirection: 'row', width: '100%', height: deviceHeight * 0.365, backgroundColor: '#FFFFFF' }}>
                <View style={styles.receiptLeftButtons}>
                  <TouchableOpacity
                    style={styles.receiptLeftButton}
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
                </View>
                <View style={styles.receiptRightContainer}>
                  <View>
                    <Text style={styles.receiptSummaryText}>Тип оплати: {receipt.payment_type === 'cash' ? 'Готівка' : 'Картка'}</Text>
                    <Text style={styles.receiptSummaryText}>До сплати: {receipt.initial} грн</Text>
                    <Text style={styles.receiptSummaryText}>Внесено: {receipt.input} грн</Text>
                    <Text style={styles.receiptSummaryText}>Знижка: {receipt.discount}</Text>
                    <Text style={styles.receiptSummaryText}>Решта: 0 грн</Text>
                    <Text style={styles.receiptSummaryText}>Час оплати: {getUpperCaseDate('HH:mm:ss', receipt.transaction_time_end)}</Text>
                    <Text style={styles.receiptSummaryText}>Працівник: {receipt.employee}</Text>
                  </View>
                  <View style={{ width: '55%', marginLeft: deviceWidth * 0.06, }}>
                    <Text style={styles.receiptSummaryText}>Зміст чеку:</Text>
                    <ScrollView
                      style={{ height: '60%', width: '100%', }}
                      persistentScrollbar
                    >
                      {receipt.receipt.map(item => (
                        <View style={{ width: '100%', borderBottomWidth: 2, borderBottomColor: '#F2F2F2', marginBottom: 10, }}>
                          <Text style={[styles.receiptSummaryReceiptText, { marginBottom: 5, }]}>{item.title}{item.size ? ', ' + item.size : ''}</Text>
                          <Text style={styles.receiptSummaryReceiptText}>- {item.quantity} шт - {item.price * item.quantity} грн</Text>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </Collapsible>
          </Fragment>
        )
      })}

      {/* {data && data.length > 0 && !loading && (
        <View style={styles.loadMoreButton}>
          <SharedButton
            style={{ flex: 1, }}
            onPress={() => {
              setLoadingStatus(true)

              dispatch(getSessions({
                offset: 'onemore',
              }, () => setLoadingStatus(false)))
            }}
            scale={0.8}
          >
            <Text style={styles.loadMoreButtonText}>Завантажити ще</Text>
          </SharedButton>
        </View>
      )}

      {data && data.length > 2 && showScrollTopButton && (
        <View style={styles.scrollTopButton}>
          <SharedButton
            style={{ flex: 1, }}
            onPress={() => scrollRef.current.scrollTo({ x: 0, y: 0 })}
            scale={0.8}
          >
            <View style={styles.scrollTopButtonInner}>
              <FastImage
                style={{ width: '50%', height: '50%', }}
                source={require('@images/to_top.png')}
              />
            </View>
          </SharedButton>
        </View>
      )} */}

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