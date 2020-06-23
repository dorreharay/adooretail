import { createStyles, maxWidth, } from 'react-native-media-queries';
import { GILROY_REGULAR, GILROY_MEDIUM, GILROY_SEMIBOLD, } from '@fonts'

import { deviceWidth, deviceHeight } from '@dimensions'

const base = {
  container: {
    flex: 1,
    // flexDirection: 'row',
    height: '90%',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  settingHeading: {
    alignSelf: 'flex-start',
    paddingHorizontal: 32,
    paddingVertical: 15,
    marginVertical: 20,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  settingHeadingText: {
    fontSize: 20,
    fontFamily: GILROY_SEMIBOLD,
  },
  settingCard: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: deviceWidth * 0.21,
    paddingVertical: 25,
    marginRight: 20,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  devider: {
    width: '80%',
    height: 1,
    marginVertical: 15,
    backgroundColor: '#EBEBEB',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 50,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: '#E3E3E3',
  },
  buttonText: {
    color: '#C6C6C6',
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
  },
  activeButton: {
    borderColor: '#E3E3E300',
    backgroundColor: '#E46162',
  },
  activeButtonText: {
    color: '#FFFFFF',
  },
  settingCategoryContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
};

const styles = createStyles(
  base,

  maxWidth(500, {

  })
);

export default styles