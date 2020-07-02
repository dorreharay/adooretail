import { createStyles, maxWidth, } from 'react-native-media-queries'
import { GILROY_BOLD, GILROY_REGULAR, GILROY_MEDIUM, PROBA_REGULAR, PROBA_MEDIUM, } from '@fonts'

import { deviceWidth, deviceHeight, } from '@dimensions'

const listWidth = deviceWidth * 0.55
const listHeight = deviceWidth * 0.35

const base = {
  container: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    width: listWidth,
    marginTop: 30,
    borderRadius: 10,
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
    height: deviceHeight * 0.7,
  },
  pairedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 80,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
  },
  pairedText: {
    color: '#343434',
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
  },
  pairedButton: {
    minWidth: 90,
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 5,
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
    height: 250,
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
    minWidth: 90,
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: '#E46162',
    borderRadius: 100,
  },
  foundButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: deviceHeight * 0.65,
  },
  emptyText: {
    marginVertical: 15,
    color: '#343434',
    fontSize: 18,
    fontFamily: GILROY_REGULAR,
  }
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles