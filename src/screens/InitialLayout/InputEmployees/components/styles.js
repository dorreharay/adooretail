import { createStyles, maxHeight, } from 'react-native-media-queries';
import { MAZZARD_LIGHT, MAZZARD_REGULAR, MAZZARD_MEDIUM, } from '@fonts'

const base = {
  сontainer: {
    marginTop: 45,
    width: 350,
    height: 360,
    zIndex: 100,
  },
  scrollview: {
    width: 350,
    height: 360,
    zIndex: 100,
    borderRadius: 22,
  },
  employee: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 70,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#4D4D4D44',
    backgroundColor: '#D2D2D21A',
  },
  employeeIcon: {
    width: 41,
    height: 41,
    marginRight: 20, 
    borderWidth: 1.5,
    borderColor: '#FFFFFF66',
    borderRadius: 120,
    opacity: 0.6,
  },
  checkedIcon: {
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  iconPlaceholder: {
    width: 41,
    height: 41,
    marginRight: 20,
    borderRadius: 22,
    backgroundColor: '#9F9F9F33',
  },
  employeeName: {
    color: '#ffffff',
    fontSize: 17,
    fontFamily: MAZZARD_REGULAR,
  },
  checkedName: {
    // fontFamily: MAZZARD_MEDIUM,
  }
};

const styles = createStyles(
  base,

  maxHeight(500, {
    сontainer: {
      width: 270,
      height: 150,
    },
    scrollview: {
      width: 270,
      height: 150,
      zIndex: 100,
      borderRadius: 22,
    },
    employee: {
      height: 50,
    },
    iconPlaceholder: {
      width: 31,
      height: 31,
      marginRight: 20,
    },
    employeeName: {
      fontSize: 12,
    },
  })
);

export default styles