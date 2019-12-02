import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

import { deviceWidth, deviceHeight } from '@dimensions';

const base = {
  panelContainer: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    width: deviceWidth,
    height: deviceHeight,
    paddingTop: '4%',
    paddingBottom: 0,
    padding: '10%',
    backgroundColor: '#FAF8F8'
  },
  panelContent: {
    width: '100%',
    height: '100%',
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  panelHeading: {
    flexDirection: 'row'
  },
  panelHeadingText: {
    color: '#414141',
    fontSize: 40,
    fontFamily: PROBA_REGULAR,
    lineHeight: 40,
  },
  closePanelInstanceButton: {
    width: 55,
    height: 55,
  },
  daysList: {
    width: '102%',
    height: '90%',
    paddingRight: '1%',
  },
  daysListScrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 100,
  },
  historyDay: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '23.5%',
    padding: 30,
    paddingTop: 20,
    paddingBottom: 30,
    marginRight: '1.5%',
    marginBottom: '2%',
    borderRadius: 5,
    backgroundColor: '#FFFFFF'
  },
  historyDayHeadingText: {
    marginBottom: 10,
    color: '#000000',
    fontSize: 22,
    fontFamily: PROBA_REGULAR,
    lineHeight: 30,
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
  sortingHeadingText: {
    marginRight: 10,
    color: '#343434',
    fontSize: 20,
    fontFamily: PROBA_REGULAR,
  },
  receiptsHistoryContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  receiptsHistoryContent: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  receiptsHistoryHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    marginBottom: 20,
    marginHorizontal: 3,
  },
  sortButton: {
    width: 180,
    height: 40,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 100,
  },
  sortButtonGradient: {
    width: 180,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 100,
  },
  sortButtonText: {
    color: '#343434',
    fontSize: 18,
    fontFamily: PROBA_REGULAR,
    lineHeight: 20,
  },
  receiptsList: {
    width: '100%',
    height: '50%',
  },
  receiptsListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    height: 70,
    paddingHorizontal: 40,
    marginBottom: 10,
    borderWidth: 1, 
    borderColor: '#F2F2F2',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  receiptsListItemBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  receiptsListItemBlockTextMain: {
    marginRight: 10,
    color: '#343434',
    fontSize: 20,
    fontFamily: PROBA_LIGHT,
  },
  receiptsListItemBlockTextSecondary: {
    color: '#343434',
    fontSize: 20,
    fontFamily: PROBA_REGULAR,
    textDecorationLine: 'underline',
  },
  receiptExpandIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    marginLeft: 14,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  receiptDetails: {
    width: '100%',
    paddingVertical: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
    fontSize: 25,
    fontFamily: FUTURA_REGULAR,
  },
  receiptDetailsBlockText2: {
    width: '30%',
    color: '#343434',
    fontSize: 25,
    fontFamily: FUTURA_REGULAR,
    textAlign: 'center'
  },
  receiptDetailsBlockText3: {
    width: '30%',
    color: '#343434',
    fontSize: 25,
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