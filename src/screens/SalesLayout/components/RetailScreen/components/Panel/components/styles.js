import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, PROBA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

import { deviceWidth, deviceHeight } from '@dimensions';

const base = {
  panelContainer: {
    alignItems: 'center',
    width: deviceWidth * 0.8,
    height: deviceHeight * 0.8,
  },
  panelContent: {
    width: '100%',
    height: '88%',
    marginTop: '1%',
    backgroundColor: '#f2f2f2',
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  panelHeading: {
    
  },
  panelHeadingText: {
    color: '#414141',
    fontSize: 35,
    fontFamily: PROBA_REGULAR,
  },
  closePanelInstanceButton: {
    width: 55,
    height: 55,
  },
  receiptsHistoryContainer: {
    flexDirection: 'row',
    width: deviceWidth * 0.83,
    height: '90%',
    marginTop: '2%',
  },
  daysList: {
    width: '30%',
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: '#F0F0F0',
  },
  historyDay: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    width: '100%',
    height: 140,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  historyDayHeadingText: {
    marginBottom: 14,
    color: '#000000',
    fontSize: 25,
    fontFamily: PROBA_REGULAR,
  },
  headingSelected: {
    color: '#FFFFFF',
    fontFamily: PROBA_MEDIUM,
  },
  historyDayCaptionText: {
    marginBottom: 14,
    color: '#000000',
    fontSize: 22,
    fontFamily: PROBA_LIGHT,
  },
  captionSelected: {
    color: '#FFFFFF',
    fontFamily: PROBA_REGULAR,
  },
  receiptsList: {
    width: '70%',
    height: '100%',
    paddingHorizontal: 30,
  },
  receiptsListItem: {
    paddingVertical: 30,
    width: '100%',
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  receiptsListItemBlock: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginRight: 52,
  },
  receiptsListItemBlockTextMain: {
    marginRight: 15,
    color: '#000000',
    fontSize: 18,
    fontFamily: PROBA_REGULAR,
  },
  receiptsListItemBlockTextSecondary: {
    color: '#000000',
    fontSize: 20,
    fontFamily: PROBA_REGULAR,
  }
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    
  })
);

export default styles