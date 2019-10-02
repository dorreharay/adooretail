import { compose } from 'recompose';
import { connect } from 'react-redux';
// import { withApollo } from 'react-apollo';
import { setAuthToken, setCurrentSession } from '../../../../../reducers/UserReducer';
import StartPanel from './StartPanel';

const mapDispatchToProps = {
  setAuthToken,
  setCurrentSession,
};

export default compose(
  // withApollo,
  connect(null, mapDispatchToProps)
)(StartPanel)
