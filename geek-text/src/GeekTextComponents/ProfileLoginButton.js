import LoginScreen from './LoginScreen';
import React, {Component} from "react";
import { Button } from '@material-ui/core';

class ProfileLoginButton extends Component {

    state = {
        redirect: false
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedriect = () => {
        if (this.state.redirect) {
            return <LoginScreen></LoginScreen>
        }
    }

    render () {
        return (
            <div>
                {this.renderRedriect()}
                <Button 
                    onClick={this.setRedirect}
                    variant="outlined">Login</Button>
            </div>
        )
    }
}

export default ProfileLoginButton;