import { createStyles, maxWidth, } from 'react-native-media-queries';
import { MAZZARD_REGULAR, MAZZARD_MEDIUM, MAZZARD_MEDIUM, MAZZARD_BOLD, } from '@fonts'

const base = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    height: 300,
    borderTopWidth: 1,
    borderTopColor: '#464646',
    backgroundColor: '#343434'
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '33.3%',
    height: '50%',
    borderWidth: 1,
    borderColor: '#464646',
  },
  tabText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: MAZZARD_REGULAR,
  }
};

const styles = createStyles(
  base,

  maxWidth(500, {

  })
);

export default styles