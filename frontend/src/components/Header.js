import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getCategoriesFromServer} from '../actions'
import { Button, PageHeader, ButtonToolbar } from 'react-bootstrap'

class Header extends Component {
  componentDidMount () {
    this.getCategories()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.params !== this.props.params) {
      this.getCategories()
    }
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
      <div className="pageHeader">
      
        <PageHeader>Readable <small>HOME</small></PageHeader>
        <ButtonToolbar>
        <Button bsSize="large" 
                active={this.props.params.category == null}
                onClick={() => this.selectCategory('/')}>ALL</Button>
        {categories.map(category => (
          <Button bsSize="large"         
                  active={this.props.params.category === category.path}
                  onClick={() => this.selectCategory(`/${category.path}`)}>{category.name}</Button>
        ))}
        </ButtonToolbar>
      </div>      
    )
  }
}

const mapStateToProps = ({categories, posts}) => ({categories, posts})
const mapDispatchToProps = {getCategoriesFromServer}


export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Header))
