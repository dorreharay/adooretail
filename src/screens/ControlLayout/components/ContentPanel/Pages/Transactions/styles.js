import { createStyles, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, GILROY_REGULAR, GILROY_MEDIUM, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'
import { deviceWidth, deviceHeight } from '@dimensions';

const base = {
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  leftContainer: {
    width: '70%',
    height: '100%',
    // backgroundColor: 'red'
  },
  rightContainer: {
    width: '30%',
    height: '100%',
    // borderLeftWidth: 1,
    // borderLeftColor: '#ECECEC'
    // backgroundColor: 'yellow'
  },
  screenHeading: {
    marginBottom: 50,
    color: '#343434',
    fontSize: 32,
    fontFamily: GILROY_REGULAR,
  },
  inputContainer: {
    paddingTop: 35,
    paddingLeft: 55,
  },
  inputHeading: {
    color: '#343434',
    fontSize: 22,
    fontFamily: GILROY_REGULAR,
  },
  textInput: {
    alignSelf: 'flex-start',
    padding: 15,
    paddingHorizontal: 25,
    borderWidth: 2,
    borderRadius: 3,

    color: '#343434',
    fontSize: 30,
    fontFamily: PROBA_MEDIUM,
  },
  textInputAfterText: {
    marginLeft: 20,
    color: '#343434',
    fontSize: 28,
    fontFamily: GILROY_REGULAR,
    lineHeight: 27,
  },
  commentInput: {
    width: deviceWidth * 0.4,
    minHeight: deviceHeight * 0.15,
    paddingTop: 10,
    padding: 30,
    borderWidth: 1,
    borderColor: '#C5C5C5',
    borderRadius: 3,

    color: '#343434',
    fontSize: 25,
    fontFamily: GILROY_REGULAR,
  },
  placeholderStyles: {
    width: deviceWidth * 0.4,
    height: deviceHeight * 0.15,
    paddingTop: 10,
    padding: 30,
    borderWidth: 1,
    borderColor: '#C5C5C5',
    borderRadius: 3,
    textAlignVertical: 'top',

    color: '#C5C5C5',
    fontSize: 20,
    fontFamily: GILROY_REGULAR,
  },
  submitContainer: {
    marginTop: 30,
    paddingLeft: 55,
    paddingRight: 50,
    width: '100%',
    height: 80,
  },
  submitText: {
    color: '#343434',
    fontSize: 26,
    fontFamily: PROBA_REGULAR,
  },
  buttonInnerStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 3,
  },
  buttonText: {
    color: '#343434',
    fontSize: 26,
    fontFamily: GILROY_REGULAR,
  },
  activeButton: {
    color: '#FFFFFF',
    fontFamily: GILROY_MEDIUM,
  },
  toastText: {
    marginBottom: 2,
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: PROBA_REGULAR,
  }
};

const styles = createStyles(
  base,

  maxWidth(500, {

  })
);

export default styles