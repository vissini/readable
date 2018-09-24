import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {sortPosts} from '../actions/posts'
import '../css/bootstrap.min.css'
import { Button, ListGroup, ListGroupItem, DropdownButton, MenuItem, Row, Col } from 'react-bootstrap'

class Controls extends Component {
  addPost = () => {
    this.props.history.push('/new')
  }

  render () {

    return (
      <div>
        <Row className='mb-3'>
          <Col xs={6}>
            <Button bsStyle="success" onClick={this.addPost}>Add post</Button>
          </Col>
          <Col xs={6} className="text-right">
            <DropdownButton title="Actions" id="bg-nested-dropdown">
              <MenuItem eventKey="1" onClick={() => this.props.sortPosts('title','asc')}>Sort by title</MenuItem>
              <MenuItem eventKey="2" onClick={() => this.props.sortPosts('timestamp','desc')}>Sort by date (desc)</MenuItem>
              <MenuItem eventKey="3" onClick={() => this.props.sortPosts('timestamp','asc')}>Sort by date (asc)</MenuItem>
              <MenuItem eventKey="4" onClick={() => this.props.sortPosts('voteScore','asc')}>Sort by score (asc)</MenuItem>
              <MenuItem eventKey="5" onClick={() => this.props.sortPosts('voteScore','desc')}>Sort by score (desc)</MenuItem>
            </DropdownButton>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({categories, posts}) => ({categories, posts})
const mapDispatchToProps = {sortPosts}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Controls))