import React from 'react';
import $ from 'jquery';
import Create_user from './signup-user.jsx';
import Create_organizer from './signup-organizer.jsx';
import {Link} from 'react-router-dom';


class Create_account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }



  render () {
    return (
    <div>
        <Link to='/signupuser'>>
     <h1>new user account</h1>
     </Link>
     <Link to='/signuporganizer'>
     <h1>new organizer account</h1>
     </Link>
    </div>)
  }
}

export default Create_account;

