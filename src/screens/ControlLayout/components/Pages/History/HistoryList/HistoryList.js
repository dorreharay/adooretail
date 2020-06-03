import React, { useState, useRef, useEffect, Fragment, } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated, Easing, FlatList, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux'
import FastImage from 'react-native-fast-image'
import styles from './styles'
import Collapsible from 'react-native-collapsible'
import { printReceipt, } from '@printer'

import SharedButton from '@shared/SharedButton'

import { deviceHeight } from '@dimensions';
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

  const handleExpand = (index, sessionTotal) => {
    if (sessionTotal === 0) return

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
      contentContainerStyle={{ paddingHorizontal: 40, paddingBottom: 600, }}
      scrollEnabled={expandedIndex === null}
      onScroll={(e) => {
        setScrollTopButtonVisibility(e.nativeEvent.contentOffset.y > 50)
      }}
      scrollEventThrottle={100}
    // onScrollEndDrag={() => setScrollTopButtonVisibility(true)}
    >
      {data && data.map((day, index) => {
        const employeesLength = day.employees ? day.employees.length : 0
        const sessionOrdersQty = day.receipts.length
        const sessionTotal = day.receipts.reduce((accumulator, currentValue) => accumulator + currentValue.total, false)

        const spin = spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        })

        return (
          <Fragment key={index}>
            <TouchableOpacity
              style={styles.dayHeader}
              onPress={() => handleExpand(index, sessionOrdersQty)}
              activeOpacity={1}
            >
              <FastImage
                style={{ width: 20, height: 20, marginRight: 28, }}
                source={require('@images/session_process.png')}
              />
              <Text style={styles.dayHeaderDate}>{getUpperCaseDate('dddd DD.MM | HH:mm', day.startTime)}</Text>
              <Text style={styles.dayHeaderTotal}>Всього: {sessionTotal || 0} грн</Text>
              <Text style={styles.dayHeaderTotal}>К-сть операцій: {sessionOrdersQty}</Text>
              {/* <Text style={styles.dayHeaderEmployees}>Працівників на зміні: {employeesLength}</Text> */}
              <View style={styles.dayHeaderIcon}>
                <AnimatedImage
                  style={[{ width: 15, height: 15 }, expandedIndex === index && { transform: [{ rotate: spin }] }]}
                  source={require('@images/down-arrow.png')}
                />
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={expandedIndex !== index}>
              <View style={{ width: '100%', maxHeight: deviceHeight * 0.625, backgroundColor: '#FFFFFF' }}>
                <ScrollView
                  style={styles.historyInstanceContainer}
                  contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', }}
                  scrollEnabled={expandedIndex === index}
                >
                  <FlatList
                    data={day.receipts.slice(day.receipts.length - 20, day.receipts.length).reverse()}
                    initialNumToRender={10}
                    removeClippedSubviews
                    renderItem={({ item }) => (
                      <View style={styles.historyInstance}>
                        <View style={{ marginRight: 5, }}>
                          <SharedButton
                            style={{ marginTop: -15, width: 69, height: 69, }}
                            onPress={() => showReceiptModal('qr', item)}
                            scale={0.8}
                          >
                            <FastImage
                              style={{ width: '26%', height: '26%', }}
                              source={require('@images/qr-code.png')}
                            />
                          </SharedButton>
                          <SharedButton
                            style={{ marginTop: -15, width: 69, height: 69, }}
                            onPress={() => reprintReceipt(item)}
                            scale={0.8}
                          >
                            <FastImage
                              style={{ width: '26%', height: '26%', }}
                              source={require('@images/tprinter.png')}
                            />
                          </SharedButton>
                        </View>


                        <View style={styles.collapsedReceiptContent}>
                          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={styles.collapsedReceiptContenHeading}>Зміст:</Text>
                          </View>

                          {item.receipt.map((elem, id) => (
                            <Text style={styles.receiptItem} key={id}>{elem.title} x{elem.quantity} - {elem.price * elem.quantity} грн</Text>
                          ))}
                        </View>

                        <View style={{ width: '62%', padding: 10, }}>
                          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, }}>
                            <Text style={styles.receiptDetailHeading}>Тип оплати: <Text style={styles.receiptDetailContent}>{item.payment_type === 'cash' ? 'Готівка' : 'Картка'}</Text></Text>
                            <Text style={styles.receiptDetailHeading}>Внесено: <Text style={styles.receiptDetailContent}>{item.receipt.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), false)} грн</Text></Text>
                          </View>

                          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, marginTop: 20, }}>
                            <Text style={styles.receiptDetailHeading}>Час транзакції: <Text style={styles.receiptDetailContent}>{getFormattedDate('HH:mm', item.transaction_time_end)}</Text></Text>
                            <Text style={styles.receiptDetailHeading}>До сплати: <Text style={styles.receiptDetailContent}>{item.receipt.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), false)} грн</Text></Text>
                          </View>

                          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, marginTop: 20, }}>
                            <Text style={styles.receiptDetailHeading}>Час оформлення: <Text style={styles.receiptDetailContent}>
                              {renderTimeSpent(item.first_product_time, item.transaction_time_end)}
                            </Text></Text>
                            <Text style={styles.receiptDetailHeading}>Решта: <Text style={styles.receiptDetailContent}>{item.change} грн</Text></Text>
                          </View>

                          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 16, marginTop: 20, }}>
                            <Text style={styles.receiptDetailHeading}>Працівник: <Text style={styles.receiptDetailContent}>{item.employee}</Text></Text>
                            <Text style={styles.receiptDetailHeading}>Знижка: <Text style={styles.receiptDetailContent}>{item.discount}</Text></Text>
                          </View>

                          {item.comment !== '' && (
                            <View style={{ width: '100%', marginTop: 20, }}>
                              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 17, }}>
                                <Text style={styles.receiptDetailHeadingComment}>Коментар: <Text style={styles.receiptDetailContent}>{item.comment}</Text></Text>
                              </View>
                            </View>
                          )}
                        </View>
                      </View>
                    )}
                    listKey={item => item.localId}
                  />
                </ScrollView>
              </View>
            </Collapsible>
          </Fragment>
        )
      })}

      {data && data.length > 0 && !loading && (
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