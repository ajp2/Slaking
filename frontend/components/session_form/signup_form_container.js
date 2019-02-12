import { connect } from "react-redux";
import SessionForm from "./session_form";

const mapStateToProps = state => ({
  formType: 'signup'
});

export default connect(
  mapStateToProps,
  null
)(SessionForm);