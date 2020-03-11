import { createStyles, maxHeight, } from 'react-native-media-queries';
import { GILROY_MEDIUM, GILROY_REGULAR, MUSEO_MEDIUM, } from '@fonts'

const leftPadding = '12%'

const base = {
  container: {
    position: 'relative',
    width: '32%',
    height: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: '#181619',
  },
  heading: {
    flexDirection: 'row',
    paddingLeft: leftPadding,
    paddingTop: '13%',
    paddingBottom: '10%',
    color: '#FFFFFF',
    fontSize: 25,
    fontFamily: GILROY_MEDIUM,
  },
  paymentType: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: leftPadding,
    padding: 20,
  },
  paymentTypeName: {
    color: '#575759',
    fontSize: 22,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 30,
  },
  cancelOrderButton: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '12%',
  },
  cancelOrderButtonText: {
    color: '#575757',
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
  },
  currentEmployee: {
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    height: 50,
    // paddingLeft: leftPadding,
    // backgroundColor: 'red'
  },
  currentEmployeeImage: {
    position: 'absolute',
    left: 34.5,
    top: 9,
    width: 32,
    height: 32,
    borderRadius: 100,
  },
  currentEmployeeBorder: {
    position: 'absolute',
    left: 30,
    width: 40.5,
    height: 40.5,
    borderWidth: 1,
    borderColor: '#E36062',
    borderRadius: 100,
  },
  currentEmployeeName: {
    marginLeft: 85,
    color: '#FFFFFF',
    fontSize: 19,
    fontFamily: GILROY_REGULAR,
  },
  editButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginTop: 4,
    marginLeft: 5,
  },
};

const styles = createStyles(
  base,

  maxHeight(500, {
    heading: {
      fontSize: 15,
    },
    paymentType: {
      paddingLeft: leftPadding,
      padding: 10,
    },
    paymentTypeName: {
      fontSize: 15,
      lineHeight: 30,
    },
    currentEmployee: {
      height: 30,
    },
    currentEmployeeImage: {
      position: 'absolute',
      left: 30.5,
      top: -1,
      width: 32,
      height: 32,
      borderRadius: 100,
    },
    currentEmployeeBorder: {
      position: 'absolute',
      left: 26,
      width: 40.5,
      height: 40.5,
      borderWidth: 1,
      borderColor: '#E36062',
      borderRadius: 100,
    },
    currentEmployeeName: {
      marginLeft: 80,
      color: '#FFFFFF',
      fontSize: 14,
      fontFamily: GILROY_REGULAR,
    },
    editButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
      marginTop: 4,
      marginLeft: 5,
    },
  })
);

export default styles