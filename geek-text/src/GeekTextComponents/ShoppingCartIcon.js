import ShoppingCartPage from './ShoppingCartPage';
import React, {Component} from "react";
import { Redirect } from 'react-router-dom'

class ShoppingCartIcon extends Component {
  state = {
    redirect: false
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to= {ShoppingCartPage} />
    }
  }
  render () {
    return (

       <div>
        {this.renderRedirect()}
        <button onClick={this.setRedirect}>TO SHOPPING CART PAGE</button>
       </div>
    )
  }
}

export default ShoppingCartIcon;