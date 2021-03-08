import { createStyles, maxHeight, } from 'react-native-media-queries';
import { MAZZARD_MEDIUM, MAZZARD_REGULAR, MUSEO_MEDIUM, } from '@fonts'

const leftPadding = '12%'

import { deviceWidth, deviceHeight } from '@dimensions'

const base = {
  container: {
    position: 'relative',
    width: '32%',
    height: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: '#181619',
  },
  employeesListContainer: {
    position: 'absolute',
    left: 0,
    width: deviceWidth,
    height: deviceHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000066',
    zIndex: 1000,
  },
  employeesListHeading: {
    margin: 30,
    marginBottom: 20,
    marginLeft: 30,
    fontSize: 25,
    fontFamily: MAZZARD_MEDIUM,
  },
  employeesList: {
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
  employeesListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 80,
    paddingLeft: 5,
  },
  employeesListItemName: {
    marginLeft: 20,
    fontSize: 20,
    fontFamily: MAZZARD_REGULAR,
  },
  pickEmployeeButton: {

  },
  pickEmployeeButtonLinear: {
    padding: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pickEmployeeButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: MAZZARD_MEDIUM,
  }
};

const styles = createStyles(
  base,

  maxHeight(500, {

  })
);

export default styles