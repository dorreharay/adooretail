import { createStyles, maxHeight, } from 'react-native-media-queries';
import { MAZZARD_MEDIUM, MAZZARD_REGULAR, MUSEO_MEDIUM, } from '@fonts'

const leftPadding = '12%'

const base = {
  container: {
    position: 'relative',
    width: '32%',
    height: '100%',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    backgroundColor: '#181619',
  },
  heading: {
    flexDirection: 'row',
    paddingLeft: leftPadding,
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: MAZZARD_MEDIUM,
  },
  paymentType: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: leftPadding,
    padding: 20,
  },
  paymentTypeName: {
    color: '#575759',
    fontSize: 18,
    fontFamily: MAZZARD_MEDIUM,
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
    fontFamily: MAZZARD_MEDIUM,
  },
  currentEmployee: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 75,
    paddingHorizontal: '11%',
    // borderWidth: 1,
    // borderColor: 'yellow'
  },
  currentEmployeeImageWrapper: {

  },
  currentEmployeeImage: {
    position: 'absolute',
    left: 4,
    top: 4,
    width: 32,
    height: 32,
    borderRadius: 100,
  },
  serviceImage: {
    width: 38,
    height: 38,
    borderRadius: 100,
  },
  currentEmployeeBorder: {
    // position: 'absolute',
    // left: 30,
    width: 40.5,
    height: 40.5,
    borderWidth: 1,
    borderColor: '#E36062',
    borderRadius: 100,
  },
  currentEmployeeName: {
    marginLeft: 15,
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: MAZZARD_REGULAR,
  },
  editButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginTop: 4,
    marginLeft: 5,
  },
  activeServiceButton: {
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    height: 50,
    marginTop: '5%',
  },
  activeServiceImage: {
    position: 'absolute',
    left: 30,
    top: 5,
    width: 40,
    height: 40,
    borderRadius: 100,
  }
};

const styles = createStyles(
  base,

  // maxHeight(670, {
  //   heading: {
  //     fontSize: 20,
  //   },
  //   paymentType: {
  //     paddingLeft: leftPadding,
  //     padding: 15,
  //   },
  //   paymentTypeName: {
  //     fontSize: 15,
  //     lineHeight: 30,
  //   },
  //   currentEmployee: {
  //     height: 55,
  //   },
  //   currentEmployeeImage: {
  //     position: 'absolute',
  //     left: 4,
  //     top: 4,
  //     width: 32,
  //     height: 32,
  //     borderRadius: 100,
  //   },
  //   currentEmployeeBorder: {
  //     width: 40.5,
  //     height: 40.5,
  //     borderWidth: 1,
  //     borderColor: '#E36062',
  //     borderRadius: 100,
  //   },
  //   currentEmployeeName: {
  //     marginLeft: 15,
  //     color: '#FFFFFF',
  //     fontSize: 15,
  //     fontFamily: MAZZARD_REGULAR,
  //   },
  //   serviceImage: {
  //     width: 38,
  //     height: 38,
  //     borderRadius: 100,
  //   },
  // })
);

export default styles