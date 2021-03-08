import { createStyles, maxHeight, } from 'react-native-media-queries';
import { MAZZARD_REGULAR, MAZZARD_MEDIUM, MAZZARD_SEMIBOLD,} from '@fonts'

import { deviceWidth, deviceHeight } from '@dimensions'

const base = {
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 3000,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  touchWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#00000088',
    zIndex: 11,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 400,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    zIndex: 12,
  },
  heading: {
    marginBottom: 20,
    color: '#000000',
    fontSize: 24,
    fontFamily: MAZZARD_SEMIBOLD,
  },
  label: {
    color: '#000000',
    fontSize: 12,
    fontFamily: MAZZARD_MEDIUM,
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    justifyContent: 'center',
    flexGrow: 1,
    height: 70,
    marginVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#F3F4F6',

    color: '#000000',
    fontSize: 26,
    fontFamily: MAZZARD_MEDIUM,
  },
  disabled: {
    backgroundColor: '#F3F4F6',
  },
  currency: {
    marginLeft: 30,
    marginRight: 20,
    color: '#000000',
    fontSize: 26,
    fontFamily: MAZZARD_MEDIUM,
  },
  debitReportButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    height: 60,
    marginVertical: 20,
    backgroundColor: '#F3F4F6',
  },
  debitReportButtonText: {
    color: '#000000',
    fontSize: 14,
    fontFamily: MAZZARD_REGULAR,
  },
  linearButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 65,
    opacity: 1,
  },
  linearButtonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingBottom: 1,
    borderRadius: 5,
  },
  linearButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: MAZZARD_MEDIUM,
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  employee: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  employeeName: {
    marginLeft: 20,
    color: '#000000',
    fontSize: 18,
    fontFamily: MAZZARD_MEDIUM,
  },
  selectedButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    backgroundColor: '#E46162',
    borderRadius: 100,
  }
};

const styles = createStyles(
  base,

  maxHeight(670, {

  }),

  maxHeight(500, {

  })
);

export default styles