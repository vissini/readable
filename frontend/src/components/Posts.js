import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Controls from '../components/Controls'
import '../css/bootstrap.min.css'
import '../css/main.css'
import { Button, Panel, Row, Col, Badge } from 'react-bootstrap'
import Moment from 'react-moment';
import CommentCount from './CommentCount'

class Posts extends Component {

  navigate = post => {
    this.props.history.push(`/${post.category}/${post.id}`)
  }

  render () {
     return (
      <div>
        <h3>Number of posts {this.props.posts.length} </h3>
        <Row>
          <Col xs={12}><Controls /></Col>
        </Row>
        <div>
        {this.props.posts.map(post => (
          <Panel bsStyle="info">
            <Panel.Heading>
              <Panel.Title>
                <Row>
                <Col xs={12} className="postTitle">{post.title}</Col>
                </Row>
                <Row>
                  <Col xs={12} md={6} className="text-left small">Author: {post.author}</Col>
                  <Col xs={12} md={2} className="text-center small">Category: {post.category}</Col>
                  <Col xs={12} md={4} className="text-right small">Date: <Moment format="DD/MM/YYYY" date={post.timestamp} /></Col>
                </Row>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Row>
                <Col xs={12}>{post.body}</Col>
              </Row>
            </Panel.Body>
            <Panel.Footer>
              <Row className="show-grid">  
                  <Col xs={12} md={7}><Button bsStyle="primary" onClick={() => this.navigate(post)}>Edit Post</Button></Col>
                  <Col xs={12} md={2} className="text-right">Score <Badge>{post.voteScore}</Badge></Col>
                  <Col xs={13} md={3} className="text-right"><CommentCount postId={post.id}/></Col>
                </Row>
            </Panel.Footer>
          </Panel> 
          )
        )}
        </div>
       </div> 
    )
  }
}

const mapStateToProps = ({posts}) => ({posts})

export default withRouter(connect(mapStateToProps)(Posts))
