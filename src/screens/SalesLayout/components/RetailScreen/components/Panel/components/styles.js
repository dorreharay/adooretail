import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

import { deviceWidth, deviceHeight } from '@dimensions';

const base = {
  panelWrapper: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: '#00000088'
  },
  panelContainer: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    width: deviceWidth * 0.8,
    height: deviceHeight * 0.8,
    marginTop: deviceHeight * 0.1,
    marginLeft: deviceWidth * 0.1,
    backgroundColor: '#FFFFFF'
  },
  panelContent: {
    width: '100%',
    height: '88%',
    marginTop: '1%',
    backgroundColor: '#FFFFFF'
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 35,
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
    width: '100%',
    height: '90%',
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
    height: 130,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  historyDayHeadingText: {
    marginBottom: 5,
    color: '#343434',
    fontSize: 25,
    fontFamily: PROBA_REGULAR,
  },
  headingSelected: {
    color: '#FFFFFF',
    fontFamily: PROBA_MEDIUM,
  },
  historyDayCaptionText: {
    marginBottom: 14,
    color: '#343434',
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
    backgroundColor: '#F9F9F9',
  },
  receiptsListItem: {
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    paddingVertical: 30,
    width: '100%',
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  receiptsListItemBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  receiptsListItemBlockTextMain: {
    marginRight: 15,
    color: '#343434',
    fontSize: 18,
    fontFamily: FUTURA_REGULAR,
  },
  receiptsListItemBlockTextSecondary: {
    color: '#343434',
    fontSize: 18,
    fontFamily: FUTURA_REGULAR,
  },
  receiptDetails: {
    width: '100%',
    paddingVertical: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  receiptDetailsBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  receiptDetailsBlockText1: {
    width: '40%',
    color: '#343434',
    fontSize: 20,
    fontFamily: FUTURA_REGULAR,
  },
  receiptDetailsBlockText2: {
    width: '30%',
    color: '#343434',
    fontSize: 20,
    fontFamily: FUTURA_REGULAR,
    textAlign: 'center'
  },
  receiptDetailsBlockText3: {
    width: '30%',
    color: '#343434',
    fontSize: 20,
    fontFamily: FUTURA_REGULAR,
    textAlign: 'right'
  },
  detailsHeading: {
    color: '#525252',
    fontSize: 18,
    fontFamily: FUTURA_LIGHT,
  }
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    
  })
);

export default styles