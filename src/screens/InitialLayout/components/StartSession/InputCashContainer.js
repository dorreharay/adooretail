import { compose } from 'recompose';
import { connect } from 'react-redux';
// import { withApollo } from 'react-apollo';
import { setStartCash, setEmployees, setEndOfSessionStatus } from '../../../../../reducers/UserReducer';
import InputCash from './InputCash';

const mapStateToProps = (state) => {
  const {token, endOfSession} = state.user;

  return {
    token, endOfSession,
  }
};

const mapDispatchToProps = {
  setStartCash, setEmployees, setEndOfSessionStatus,
};

export default compose(
  // withApollo,
  connect(mapStateToProps, mapDispatchToProps)
)(InputCash)
