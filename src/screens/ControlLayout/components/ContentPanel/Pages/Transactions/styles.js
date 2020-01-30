import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, FUTURA_REGULAR, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'
import { deviceWidth, deviceHeight } from '@dimensions';

const base = {
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  leftContainer: {
    width: '60%',
    height: '100%',
    // backgroundColor: 'red'
  },
  rightContainer: {
    width: '40%',
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: '#ECECEC'
    // backgroundColor: 'yellow'
  },
  inputContainer: {
    paddingTop: 65,
    paddingLeft: 35,
  },
  inputHeading: {
    color: '#343434',
    fontSize: 25,
    fontFamily: PROBA_REGULAR,
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
    fontSize: 30,
    fontFamily: PROBA_REGULAR,
  },
  commentInput: {
    width: deviceWidth * 0.4,
    height: deviceHeight * 0.25,
    paddingTop: 30,
    padding: 30,
    borderWidth: 1,
    borderColor: '#C5C5C5',
    borderRadius: 3,

    color: '#343434',
    fontSize: 25,
    fontFamily: PROBA_REGULAR,
  },
  placeholderStyles: {
    width: deviceWidth * 0.4,
    height: deviceHeight * 0.25,
    paddingTop: 30,
    padding: 30,
    borderWidth: 1,
    borderColor: '#C5C5C5',
    borderRadius: 3,

    color: '#C5C5C5',
    fontSize: 20,
    fontFamily: PROBA_REGULAR,
  },
  submitContainer: {
    marginTop: 30,
    paddingLeft: 35,
    paddingRight: 50,
    width: '100%',
    height: 80,
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
    fontFamily: PROBA_REGULAR,
  },
  activeButton: {
    color: '#FFFFFF',
    fontFamily: PROBA_MEDIUM,
  },
};

const styles = createStyles(
  base,

  maxWidth(500, {

  })
);

export default styles