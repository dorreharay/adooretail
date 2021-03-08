import { createStyles, maxHeight, } from 'react-native-media-queries';
import { MAZZARD_REGULAR, MAZZARD_MEDIUM, MAZZARD_LIGHT, MAZZARD_REGULAR, MAZZARD_MEDIUM, } from '@fonts'

const leftPadding = '7.5%'

const base = {
  container: {
    backgroundColor: '#FFFFFF'
  },
  headingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: leftPadding,
    marginBottom: 15,
  },
  headingText: {
    color: '#343434',
    fontSize: 25,
    fontFamily: MAZZARD_MEDIUM,
  },
  arrowStyles: {
    width: 15,
    height: 15,
    marginLeft: 10,
  },
  collapsibleContainer: {
    width: '100%',
  },
  contentContainerStyle: {
    paddingLeft: leftPadding,
  },
};

const styles = createStyles(
  base,

  maxHeight(500, {

  })
);

export default styles