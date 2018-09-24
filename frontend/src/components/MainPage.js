import React, {Component} from 'react'
import {connect} from 'react-redux'
import Posts from '../components/Posts'
import Header from '../components/Header'
import * as actions from '../actions/posts'
import '../css/bootstrap.min.css'
import { Grid, Row, Col } from 'react-bootstrap'

class Homepage extends Component {
  componentDidMount () {
    this.getPosts()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.getPosts()
    }
  }

  getPosts = () => {
    const {category} = this.props.match.params
    if (category != null) {
      this.props.getPostsByCategoryFromServer(category)
    } else {
      this.props.getPostsFromServer()
    }
  }

  render () {
    return (
      <div>
      <Grid>
       <Row className="show-grid">
       <Col xs={12} md={12}><Header params={this.props.match.params}/></Col>
       </Row>
       <Row className="show-grid">
          <Col xs={12} md={12}><Posts /></Col>
        </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({categories, posts}) => ({categories, posts})

export default connect(mapStateToProps, actions)(Homepage)
