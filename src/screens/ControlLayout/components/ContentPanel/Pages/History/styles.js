import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_LIGHT, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

const base = {
  container: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 40,
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
    height: '100%',
    marginTop: 20,
  },
  historyInstance: {
    width: '25%',
    padding: 25,
    // borderWidth: 1,
  },
  receiptTime: {
    color: '#000000',
    fontSize: 30,
    fontFamily: PROBA_REGULAR,
  },
  receiptItem: {
    marginTop: 10,
    color: '#000000',
    fontSize: 15,
    fontFamily: PROBA_LIGHT,
    lineHeight: 30,
  },
  receiptTotal: {
    marginTop: 15,
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