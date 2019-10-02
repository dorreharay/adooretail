import { compose } from 'recompose';
import { connect } from 'react-redux';
import { setStartCash, setCurrentSession } from '../../../../../../reducers/UserReducer';
import InputEmployee from './InputEmployee';

const mapStateToProps = (state) => {
  const {startCash, token, employees} = state.user;

  return {
    startCash, token, employees,
  }
};

const mapDispatchToProps = {
  setStartCash, setCurrentSession,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(InputEmployee)
