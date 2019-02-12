import { connect } from 'react-redux';
import SessionForm from './session_form';

const mapStateToProps = state => ({
  formType: 'login'
});

const mapDispatchToProps = dispatch => ({
  processForm: () => console.log("processing")
});

export default connect(
  mapStateToProps, 
  null
)(SessionForm);