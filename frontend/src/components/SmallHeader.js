import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getCategoriesFromServer} from '../actions'
import { Button, PageHeader, ButtonToolbar } from 'react-bootstrap'

class SmallHeader extends Component {
  componentDidMount () {
    this.getCategories()
  }

  getCategories = () => {
    this.props.getCategoriesFromServer()
  }

  selectCategory = location => {
    this.props.history.push(location)
  }

  render () {
    const {categories} = this.props
    return (
      <div>
            <ButtonToolbar>
            <Button bsSize="large" 

                onClick={() => this.selectCategory('/')}>ALL</Button>
            {categories.map(category => (
              <Button bsSize="large" 
                    

               onClick={() => this.selectCategory(`/${category.path}`)}>{category.name}</Button>
            ))}
           </ButtonToolbar>
      </div>      
    )
  }
}

const mapStateToProps = ({categories }) => ({categories})
const mapDispatchToProps = {getCategoriesFromServer}


export default withRouter( connect(mapStateToProps, mapDispatchToProps)(SmallHeader))
