import { connect } from 'react-redux';
import HomePage from './home_page';
import { logout, login } from '../../actions/session_actions';

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  loginAsGuest: () => dispatch(login({ username: 'guest' }))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);