import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_LIGHT, GILROY_REGULAR, GILROY_MEDIUM, } from '@fonts'

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
    paddingLeft: leftPadding,
    paddingVertical: '13%',
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
    fontFamily: GILROY_REGULAR,
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
    alignItems: 'center',
    flexDirection: 'row',
    width: '75%',
    height: 50,
    paddingLeft: leftPadding,
  },
  currentEmployeeImage: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 100,
  },
  currentEmployeeName: {
    marginLeft: 15,
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: GILROY_REGULAR,
  },
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    
  })
);

export default styles