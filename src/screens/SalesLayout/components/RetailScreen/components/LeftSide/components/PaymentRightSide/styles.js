import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_LIGHT, GILROY_REGULAR, GILROY_MEDIUM, } from '@fonts'

const leftPadding = '7.5%'

const base = {
  container: {
    position: 'relative',
    width: '68%',
    height: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  heading: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingRight: '3%',
  },
  headingText: {
    paddingLeft: leftPadding,
    paddingTop: '7%',
    paddingBottom: '5%',
    color: '#343434',
    fontSize: 25,
    fontFamily: GILROY_MEDIUM,
  },
  toByPaid: {
    borderLeftWidth: 1,
    borderColor: '#D6D6D6',
    paddingLeft: 20,
    paddingVertical: 6,
    marginLeft: leftPadding,
    marginTop: '2%',
  },
  toByPaidText: {
    color: '#343434',
    fontSize: 25,
    fontFamily: GILROY_REGULAR,
  },
  paid: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 25,
    paddingLeft: leftPadding,
  },
  paidInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 15,
    borderWidth: 1.5,
    borderColor: '#343434',
    borderRadius: 3,

    color: '#343434',
    fontSize: 25,
    fontFamily: GILROY_MEDIUM,
  },
  paidText: {
    color: '#343434',
    fontSize: 25,
    fontFamily: GILROY_REGULAR,
    lineHeight: 27,
  },
  changeText: {
    color: '#9A9A9A',
    fontSize: 20,
    fontFamily: GILROY_REGULAR,
    lineHeight: 27,
  },
  cancelButton: {
    height: 50,
    paddingTop: 3,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: '#343434',
    fontSize: 15,
    fontFamily: GILROY_REGULAR,
  },
  orderContainer: {
    width: '80%',
    height: '7%',
    marginLeft: leftPadding,
    borderWidth: 1.5,
    borderColor: '#E3E3E3',
    borderRadius: 5,
  },
  orderItem: {
    width: '100%',
    height: 60,
    marginBottom: 5,
    backgroundColor: '#f3f3f3'
  }
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    
  })
);

export default styles