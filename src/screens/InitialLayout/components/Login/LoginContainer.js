import { compose } from 'recompose';
import { connect } from 'react-redux';
import { setAuthToken, setCurrentSession } from '../../../../../reducers/UserReducer';
import Login from './Login';

const mapDispatchToProps = {
  setAuthToken,
  setCurrentSession,
};

export default compose(
  connect(null, mapDispatchToProps)
)(Login)
