import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, PROBA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

import { deviceWidth, deviceHeight } from '@dimensions';

const base = {
  panelContainer: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    width: deviceWidth,
    height: deviceHeight,
    paddingTop: '7%',
    padding: '10%',
    backgroundColor: '#FFFFFF'
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
    paddingBottom: 40,
  },
  panelHeading: {
    flexDirection: 'row'
  },
  panelHeadingText: {
    color: '#414141',
    fontSize: 35,
    fontFamily: PROBA_REGULAR,
    lineHeight: 40,
  },
  closePanelInstanceButton: {
    width: 55,
    height: 55,
  },
  receiptsHistoryContainer: {
    flexDirection: 'column',
    width: '100%',
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
    width: '24%',
    padding: 30,
    paddingBottom: 15,
    marginRight: '1%',
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#FBFBFB',
  },
  historyDayHeadingText: {
    marginBottom: 10,
    color: '#000000',
    fontSize: 25,
    fontFamily: PROBA_REGULAR,
    lineHeight: 30,
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
    fontSize: 18,
    fontFamily: PROBA_REGULAR,
  }
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    
  })
);

export default styles