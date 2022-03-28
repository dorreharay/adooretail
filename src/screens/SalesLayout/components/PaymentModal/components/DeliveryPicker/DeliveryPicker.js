import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';
import styles from './styles';

import { setCurrentService } from '@reducers/UserReducer';

function DeliveryPicker() {
  const dispatch = useDispatch();

  const account = useSelector(state => state.account);
  const currentService = useSelector(state => state.user.currentService) || 0;

  const renderServiceIcon = id => {
    if (id === 0) {
      return require('@images/question.png');
    }
    if (id === 1) {
      return require('@images/glovo-icon.png');
    }
    if (id === 2) {
      return require('@images/raketa-icon.png');
    }
    if (id === 3) {
      return require('@images/misteram-icon.png');
    }
    if (id === 4) {
      return require('@images/ubereats-icon.png');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainerStyle}
      horizontal={true}
    >
      {account &&
        account?.delivery_services &&
        account?.delivery_services.map((item, key) => (
          <TouchableOpacity
            style={styles.deliveryListItem}
            onPress={() => {
              dispatch(setCurrentService(key));
            }}
            activeOpacity={0.9}
            key={key}
          >
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <View
                style={[
                  styles.frame,
                  currentService === key && { borderColor: '#E66960' },
                ]}
              >
                <FastImage
                  style={styles.serviceIcon}
                  source={renderServiceIcon(key)}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
}

export default DeliveryPicker;
