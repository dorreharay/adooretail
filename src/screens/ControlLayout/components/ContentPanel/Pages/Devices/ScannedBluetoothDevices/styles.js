import { createStyles, maxWidth, } from 'react-native-media-queries'
import { GILROY_BOLD, GILROY_REGULAR, GILROY_MEDIUM, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

import { deviceWidth } from '@dimensions'

const listWidth = deviceWidth * 0.35
const listHeight = deviceWidth * 0.35

const base = {
  container: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    width: listWidth,
    marginTop: 30,
  },
  listHeading: {
    width: listWidth,
    marginVertical: 15,
  },
  listHeadingText: {
    color: '#343434',
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
  },
  pairedList: {
    width: listWidth,
  },
  pairedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 60,
    marginBottom: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  pairedText: {
    color: '#343434',
    fontSize: 20,
    fontFamily: GILROY_REGULAR,
  },
  pairedButton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#E46162',
    borderRadius: 100,
  },
  pairedButtonText: {
    color: '#E46162',
    fontSize: 10,
    fontFamily: GILROY_MEDIUM,
  },
  foundList: {
    width: listWidth,
    minHeight: 300,
  },
  foundItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 60,
    paddingHorizontal: 20,
    marginBottom: 1,
    backgroundColor: '#FFFFFF',
  },
  foundText: {
    color: '#343434',
    fontSize: 20,
    fontFamily: GILROY_REGULAR,
  },
  foundButton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: '#E46162',
    borderRadius: 100,
  },
  foundButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: GILROY_MEDIUM,
  },
  unavailableWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: deviceWidth * 0.7,
    height: listHeight,
    marginTop: 50,
  },
  unavailableWrapperText: {
    color: '#343434',
    fontSize: 15,
    fontFamily: GILROY_REGULAR,
  },
  emptyText: {
    marginVertical: 15,
    color: '#343434',
    fontSize: 13,
    fontFamily: GILROY_REGULAR,
  }
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles