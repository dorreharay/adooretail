import { createStyles, maxHeight, minWidth, maxWidth, } from 'react-native-media-queries';
import { COMFORTAA_LIGHT, FUTURA_LIGHT, PROBA_REGULAR, } from '@fonts'

const toolsBarHeight = 45

const base = {
  container: {
    flex: 1,
    flexGrow: 2,
    padding: '2%',
    paddingTop: 15,
    paddingBottom: 0,
    backgroundColor: '#F4F4F4'
  },
  toolsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 45,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingLeft: 15,
    height: toolsBarHeight,
    marginRight: 10,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  inputText: {
    marginTop: 0.5,
    flex: 1,
    fontSize: 17,
    fontFamily: PROBA_REGULAR,
  },
  connection: {
    flexDirection: 'row',
    alignItems: 'center',
    height: toolsBarHeight,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  connectionText: {
    marginBottom: 2.5,
    fontSize: 16,
    fontFamily: PROBA_REGULAR,
  },
  update: {
    width: toolsBarHeight,
    height: toolsBarHeight,
    marginRight: 10,
    borderRadius: 2,
  },
  menu: {
    width: toolsBarHeight,
    height: toolsBarHeight,
    borderRadius: 3,
  },
  optionsContainer: {
    marginTop: 55,
    width: 300,
    height: 327,
    padding: 0,
    justifyContent: 'space-between',
    borderRadius: 4,
    elevation: 0,
    backgroundColor: '#FFFFFF00'
  },
  optionWrapper: {
    padding: 0,
    // backgroundColor: '#FFFFFF'
  },
  triggerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
};
 
const styles = createStyles(
  base,
 
  maxWidth(500, {
    
  })
);

export default styles