import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

const base = {
  container: {
    flex: 1,
  },
  dayHeader: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    width: '100%',
    height: 60,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF'
  },
  dayHeaderDate: {
    width: '22%',
    marginRight: 30,
    color: '#343434',
    fontSize: 18,
    fontFamily: PROBA_REGULAR,
  },
  dayHeaderTotal: {
    minWidth: '25%',
    marginRight: 30,
    color: '#343434',
    fontSize: 18,
    fontFamily: PROBA_REGULAR,
  },
  dayHeaderEmployees: {
    marginRight: 30,
    color: '#343434',
    fontSize: 18,
    fontFamily: PROBA_REGULAR,
  },
  dayHeaderIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 60,
    height: 60,
  },
  employeesContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 70,
    marginTop: 20,
    paddingHorizontal: 25,
  },
  employeeBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 50,
  },
  employee: {
    position: 'relative',
    width: 50,
    height: 50,
    borderRadius: 1000,
    borderWidth: 1.5,
    borderColor: '#E54F46',
  },
  employeeImage: {
    position: 'absolute',
    top: 3,
    left: 3,
    width: 40,
    height: 40,
    borderRadius: 1000,
    backgroundColor: 'red'
  },
  employeeName: {
    marginLeft: 15,
    color: '#343434',
    fontSize: 20,
    fontFamily: PROBA_REGULAR,
  },
  total: {
    position: 'absolute',
    right: 25,
    color: '#343434',
    fontSize: 20,
    fontFamily: PROBA_MEDIUM,
  },
  historyInstanceContainer: {
    width: '100%',
    height: '93%',
    // borderTopWidth: 1,
    borderColor: '#F3F3F3'
  },
  historyInstance: {
    flexDirection: 'row',
    width: '100%',
    padding: 25,
    borderBottomWidth: 1,
    borderColor: '#F3F3F3'
  },
  receiptTime: {
    color: '#000000',
    fontSize: 21,
    fontFamily: PROBA_REGULAR,
  },
  receiptType: {
    marginTop: 17,
    color: '#000000',
    fontSize: 20,
    fontFamily: PROBA_REGULAR,
  },
  receiptItem: {
    color: '#535353',
    fontSize: 18,
    fontFamily: PROBA_REGULAR,
    lineHeight: 35,
  },
  receiptTotal: {
    marginTop: 18,
    color: '#000000',
    fontSize: 19,
    fontFamily: PROBA_REGULAR,
  },
  collapsedReceiptContent: {
    flexDirection: 'column',
    // flexWrap: 'wrap',
    width: '100%',
  }
};

const styles = createStyles(
  base,

  maxWidth(500, {

  })
);

export default styles