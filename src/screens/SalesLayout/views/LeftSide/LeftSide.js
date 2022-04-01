import React, { useState, useEffect, useMemo } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import BackgroundTimer from 'react-native-background-timer';
import _ from 'lodash';
import styles from './styles';

import { deviceHeight } from '@dimensions';
import { dbidGenerator } from '@helpers';
import { getUpperCaseDate, getFormattedDate } from '@dateFormatter';
import { printNewBuffer, printPreReceipt } from '@printer';
import { headerHeight, headerButtonSizes, lsInstance } from '@constants';

import {
  setBuffer,
  setPaymentModalVisibility,
  setOldReceipt,
  setPrintStatus,
  setReceiptOptionsVisibility,
} from '@reducers/TempReducer';
import { setActiveReceipt } from '@reducers/OrderReducer';
import { lastSessionSelector, activeReceiptSelector } from '@selectors';

import ClockIcon from '@images/wall-clock.svg';

import SharedButton from '@shared/SharedButton';
import Receipt from './components/Receipt';

function LeftSide() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const activeReceipt = useSelector(activeReceiptSelector);
  const activeReceiptIndex = useSelector(
    state => state.orders.activeReceiptIndex,
  );
  const settings = useSelector(state => state.user.settings);
  const receipts = useSelector(state => state.orders.receipts);
  const receiptsIds = useSelector(state => state.orders.receiptsIds);
  const receiptsPreStates = useSelector(
    state => state.orders.receiptsPreStates,
  );
  const buffer = useSelector(state => state.temp.buffer);
  const oldReceiptState = useSelector(state => state.temp.oldReceiptState);
  const lastSession = useSelector(lastSessionSelector);
  const currentEmployee = useSelector(state => state.user.currentEmployee) || 0;
  const printInProgress = useSelector(state => state.temp.printInProgress);

  const [isReceiptInstancesVisible, setReceiptInstancesVisibility] = useState(
    false,
  );
  const [currentTime, setCurrentTime] = useState(
    getUpperCaseDate('dddd DD.MM | HH:mm'),
  );
  const [bufferButtonDisabled, setBufferButtonState] = useState(true);

  const validateTime = () => {
    const fullDate = getUpperCaseDate('dddd  |  HH:mm');

    setCurrentTime(fullDate);
  };

  const startTimer = e => {
    validateTime();
  };

  const checkQuantityChange = (newReceipt, oldReceipt, newDiff) => {
    console.log('-------> 1 перевірка зміни quantity');

    let diff = _.difference(newReceipt, oldReceipt, 'quantity');

    diff = diff.filter(item =>
      oldReceipt.find(elem => elem.hash_id === item.hash_id),
    );

    const temp = diff.map(newItem => {
      const oldItem = oldReceipt.find(elem => elem.time === newItem.time);

      if (newItem.quantity !== oldItem.quantity) {
        if (newItem.quantity > oldItem.quantity) {
          return {
            ...newItem,
            diff: `+${newItem.quantity - oldItem.quantity}`,
          };
        } else {
          return {
            ...newItem,
            diff: `-${oldItem.quantity - newItem.quantity}`,
          };
        }
      }
    });

    return [...newDiff, ...temp];
  };

  const checkNewItems = (newReceipt, oldReceipt, newDiff) => {
    console.log('-------> 2 перевірка нових елементів');

    const diffWithNewItems = _.difference(newReceipt, oldReceipt);

    oldReceipt = oldReceipt.sort(
      (a, b) =>
        parseInt(a.time.slice(-5).replace(':', '')) -
        parseInt(b.time.slice(-5).replace(':', '')),
    );
    newReceipt = newReceipt.sort(
      (a, b) =>
        parseInt(a.time.slice(-5).replace(':', '')) -
        parseInt(b.time.slice(-5).replace(':', '')),
    );

    if (diffWithNewItems.length === 0) {
      console.log('-------> 2-1 нічого не змінилось, скіпаю');

      return newDiff;
    }

    if (
      diffWithNewItems.every(item =>
        oldReceipt.find(elem => elem.hash_id === item.hash_id),
      )
    ) {
      console.log('-------> 2-2 нічого не змінилось, скіпаю');

      return newDiff;
    }

    const temp = diffWithNewItems.map(item => {
      const oldItem = newDiff.find(elem => elem.time === item.time);

      return oldItem ? oldItem : item;
    });

    return [
      ...new Map(
        [...newDiff, ...temp].map(item => [item['hash_id'], item]),
      ).values(),
    ];
  };

  const checkDeletedItems = (newReceipt, oldReceipt, newDiff) => {
    console.log('-------> 3 перевірка видалених елементів');

    const diff = _.difference(oldReceipt, newReceipt);

    let temp = diff.map(item => ({ ...item, diff: `-${item.quantity}` }));

    oldReceipt = oldReceipt.sort(
      (a, b) =>
        parseInt(a.time.slice(-5).replace(':', '')) -
        parseInt(b.time.slice(-5).replace(':', '')),
    );
    newReceipt = newReceipt.sort(
      (a, b) =>
        parseInt(a.time.slice(-5).replace(':', '')) -
        parseInt(b.time.slice(-5).replace(':', '')),
    );

    if (
      newReceipt.length === oldReceipt.length &&
      newReceipt.every(item =>
        oldReceipt.find(elem => elem.hash_id === item.hash_id),
      )
    ) {
      console.log('-------> 3-1 нічого не змінилось, скіпаю');

      return newDiff;
    }

    if (
      oldReceipt &&
      !newReceipt.some(item =>
        oldReceipt.find(elem => elem.hash_id === item.hash_id),
      )
    ) {
      console.log(
        '-------> 3-2 всі попередні елементи видалені, але добавлені нові, що є унікальними',
      );

      newDiff = [...newReceipt, ...newDiff];
    }

    temp = temp.filter(
      item => !newDiff.find(elem => elem.hash_id === item.hash_id),
    );

    return [
      ...new Map(
        [...newDiff, ...temp].map(item => [item['hash_id'], item]),
      ).values(),
    ];
  };

  const updateBuffer = data => {
    const newBuffer = buffer.map((item, index) =>
      index === activeReceiptIndex ? data : item,
    );

    dispatch(setBuffer(newBuffer));
  };

  const saveBuffer = async () => {
    if (bufferButtonDisabled || printInProgress) return;

    dispatch(setPrintStatus(true));

    await performPrinterScript();

    dispatch(setPrintStatus(false));
  };

  const performPrinterScript = async () => {
    try {
      const bufferInstance = await compareReceipts();

      if (bufferInstance) {
        await printNewBuffer(bufferInstance);

        const newOldReceipt = oldReceiptState.map((item, index) =>
          index === activeReceiptIndex ? activeReceipt : item,
        );

        dispatch(setOldReceipt(newOldReceipt));
        updateBuffer(bufferInstance);
      }
    } catch (error) {
      console.log('Need to connect device');
    }
  };

  const compareReceipts = async () => {
    const oldBuffer = buffer[activeReceiptIndex];
    const oldReceipt = oldReceiptState[activeReceiptIndex];

    let newDiff = [];

    if (oldBuffer === null) {
      newDiff = activeReceipt;
    } else {
      newDiff = checkQuantityChange(activeReceipt, oldReceipt, newDiff);
      newDiff = checkNewItems(activeReceipt, oldReceipt, newDiff);
      newDiff = checkDeletedItems(activeReceipt, oldReceipt, newDiff);
    }

    console.log(
      '%c%s',
      'color: #FFFFFF; background: #AD6D87; padding: 2px 15px; border-radius: 2px; font: 0.8rem Tahoma;',
      'Buffer',
      newDiff,
    );

    if (newDiff.every(item => item === undefined)) return null;

    const bufferInstance = {
      ...buffer[activeReceiptIndex],
      hash_id:
        oldBuffer === null
          ? dbidGenerator()
          : buffer[activeReceiptIndex].hash_id,
      receipt: newDiff,
    };

    return bufferInstance;
  };

  const openPaymentModal = () => {
    if (receiptSum <= 0 || printInProgress) return;

    dispatch(setPaymentModalVisibility(true));
  };

  const handlePreReceipt = async () => {
    if (printInProgress) return;

    const receiptId = receiptsIds[activeReceiptIndex];

    const payload = {
      receipt: activeReceipt,
      hash_id: receiptId,
      total: activeReceipt.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.quantity,
        0,
      ),
      transaction_time_end: getFormattedDate('YYYY-MM-DD HH:mm:ss'),
      employee: lastSession ? lastSession?.employees[currentEmployee] : '',
    };

    try {
      dispatch(setPrintStatus(true));

      await printPreReceipt(payload);
    } catch (error) {
    } finally {
      dispatch(setPrintStatus(false));
    }
  };

  useEffect(() => {
    const ref = BackgroundTimer.setInterval(() => {
      validateTime();
    }, 20);

    return () => {
      BackgroundTimer.clearInterval(ref);
    };
  }, []);

  const receiptSum = useMemo(() => {
    return activeReceipt?.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      0,
    );
  }, [activeReceipt, activeReceiptIndex]);

  useEffect(() => {
    async function deepBufferCheck() {
      const bufferInstance = await compareReceipts();

      setBufferButtonState(!!!bufferInstance);
    }

    deepBufferCheck();
  }, [receiptSum, buffer[activeReceiptIndex]]);

  const paymentColorSchema = useMemo(() => {
    return {
      gradient: ['#DB3E69', '#FD9C6C'],
      color: '#E46162',
      disabled: '#E4616255',
      icon: require('@images/receipt1.png'),
    };
  }, []);

  return (
    <View style={styles.container}>
      {isReceiptInstancesVisible ? (
        <View
          style={[styles.header, { paddingLeft: 25, height: headerHeight }]}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '75%',
              flexDirection: 'row',
            }}
          >
            {receipts.map((receiptInstance, index) => (
              <View
                style={[styles.lsInstanceContainer, lsInstance]}
                key={index}
              >
                <SharedButton
                  onPress={() => dispatch(setActiveReceipt(index))}
                  style={{ flex: 1 }}
                  borderRadius={headerHeight}
                  scale={0.8}
                >
                  <LinearGradient
                    start={{ x: 2, y: 1 }}
                    end={{ x: 0, y: 2 }}
                    colors={
                      activeReceiptIndex === index
                        ? paymentColorSchema.gradient
                        : ['#FF767500', '#FD9C6C00']
                    }
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: headerHeight - 20,
                      height: '100%',
                      paddingBottom: 3,
                      borderRadius: headerHeight,
                    }}
                  >
                    <Text
                      style={[
                        styles.receiptButtonText,
                        activeReceiptIndex === index && {
                          color: '#FFFFFF',
                        },
                      ]}
                    >
                      {index + 1}
                    </Text>
                  </LinearGradient>
                </SharedButton>
              </View>
            ))}
          </View>
          <View
            style={{
              width: '25%',
              marginLeft: 0.5,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <SharedButton
              onPress={() => {
                setReceiptInstancesVisibility(!isReceiptInstancesVisible);
              }}
              style={headerButtonSizes}
              iconStyle={{ width: 16, height: 16 }}
              source={require('@images/prev.png')}
            />
          </View>
        </View>
      ) : (
        <View
          style={[styles.header, { height: headerHeight }]}
          onLayout={e => startTimer(e)}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '71%',
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: deviceHeight < 500 ? 10 : 0,
              }}
            >
              <SharedButton
                onPress={() => {}}
                style={{
                  width: headerButtonSizes.width - 17,
                  height: headerButtonSizes.height - 17,
                }}
                scale={0.85}
              >
                <ClockIcon width={16} height={16} />
              </SharedButton>
              <Text
                style={styles.timeText}
                numberOfLines={1}
                ellipsizeMode={'head'}
              >
                {currentTime}
              </Text>
            </View>

            <SharedButton
              style={[
                headerButtonSizes,
                !activeReceipt?.length && {
                  opacity: 0.5,
                },
              ]}
              iconStyle={{ width: 16, height: 16 }}
              onPress={() => {
                if (!activeReceipt?.length) return;

                dispatch(setReceiptOptionsVisibility(true));
              }}
              source={
                !activeReceipt?.length
                  ? require('@images/kebab-disabled.png')
                  : require('@images/kebab.png')
              }
            />
          </View>

          <View
            style={{
              width: '23%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <SharedButton
              style={headerButtonSizes}
              iconStyle={{ width: 16, height: 16 }}
              onPress={() => {
                setReceiptInstancesVisibility(!isReceiptInstancesVisible);
              }}
              source={require('@images/split_orders.png')}
            />
          </View>
        </View>
      )}
      <ScrollView
        style={styles.receipts}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <Receipt />
      </ScrollView>
      {settings.printer_enabled ? (
        <View style={{ width: '100%', paddingHorizontal: '7%' }}>
          <View
            style={{
              width: '100%',
              paddingTop: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              onPress={openPaymentModal}
              style={[styles.proceedContainer, styles.zProceed]}
              activeOpacity={0.8}
            >
              <LinearGradient
                style={[
                  styles.lsproceedButton,
                  (receiptSum <= 0 || printInProgress) && { opacity: 0.5 },
                ]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                colors={paymentColorSchema.gradient}
              >
                <Text
                  style={[
                    styles.lsproceedButtonText,
                    { fontSize: 22 },
                    settings.printer_precheck &&
                      settings.printer_preorder && { fontSize: 16 },
                  ]}
                >
                  ОПЛАТА {receiptSum ? receiptSum : 0}₴
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {settings.printer_precheck && (
              <TouchableHighlight
                onPress={handlePreReceipt}
                style={[
                  styles.proceedContainer,
                  styles.zProceedEx,
                  { borderColor: paymentColorSchema.color },
                  { paddingHorizontal: 0, paddingVertical: 0 },
                  (printInProgress ||
                    receiptSum === 0 ||
                    receiptsPreStates.find(
                      item => item.hash_id === receiptsIds[activeReceiptIndex],
                    )) && { borderColor: paymentColorSchema.disabled },
                ]}
                underlayColor={paymentColorSchema.disabled}
              >
                <View
                  style={[
                    styles.lsproceedButton,
                    // { opacity: 0.4 }
                  ]}
                >
                  <Text
                    style={[
                      styles.lspreText,
                      { color: paymentColorSchema.color },
                      (printInProgress ||
                        receiptSum === 0 ||
                        receiptsPreStates.find(
                          item =>
                            item.hash_id === receiptsIds[activeReceiptIndex],
                        )) && { opacity: 0.4 },
                    ]}
                  >
                    ПРЕЧ.
                  </Text>
                </View>
              </TouchableHighlight>
            )}

            {settings.printer_preorder && (
              <TouchableHighlight
                onPress={saveBuffer}
                style={[
                  styles.proceedContainer,
                  styles.zProceedEx,
                  { borderColor: paymentColorSchema.color },
                  { paddingHorizontal: 0, paddingVertical: 0 },
                  (printInProgress || bufferButtonDisabled) && {
                    borderColor: paymentColorSchema.disabled,
                  },
                ]}
                underlayColor={paymentColorSchema.disabled}
              >
                <View
                  style={[
                    styles.lsproceedButton,
                    (printInProgress || bufferButtonDisabled) && {
                      opacity: 0.4,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.lspreText,
                      { color: paymentColorSchema.color },
                    ]}
                  >
                    ЗУСТ.
                  </Text>
                </View>
              </TouchableHighlight>
            )}
          </View>
        </View>
      ) : (
        <>
          <TouchableOpacity
            onPress={openPaymentModal}
            style={styles.proceedContainer}
            activeOpacity={1}
          >
            <LinearGradient
              style={[
                styles.lsproceedButton,
                receiptSum <= 0 && { opacity: 0.5 },
              ]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              colors={paymentColorSchema.gradient}
            >
              <Text style={[styles.lsproceedButtonText, { fontSize: 20 }]}>
                ОПЛАТА {receiptSum ? receiptSum : 0}₴
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default LeftSide;
