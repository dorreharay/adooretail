import { createStyles, maxWidth, } from 'react-native-media-queries'
import { GILROY_MEDIUM, } from '@fonts'

const base = {
  container: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    height: 50,
    marginTop: 20,
    marginBottom: 50,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minWidth: 100,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1.2,
    borderColor: '#E46162',
    borderRadius: 5,
  },
  text: {
    color: '#E46162',
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
  }
};

const styles = createStyles(
  base,

 maxWidth(500, {

  })
);

export default styles