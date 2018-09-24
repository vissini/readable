import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import '../css/bootstrap.min.css'
import { Button,
Panel,
Grid,
Row,
Col,
Badge } from 'react-bootstrap'

class Comments extends Component {

  goToComment = comment => {
    this.props.history.push(`/comments/${comment.id}`)
  }

  render () {
     return (
        <div>
        <h3>Number of Comments {this.props.comments.length} </h3>
        <div>
        {this.props.comments.map(comment => ( 
          <Panel header={comment.author}>
            <Grid>
              <Row className="show-grid">
                <Col xs={4} md={4}> {comment.body}</Col>
              </Row>
              <Row className="show-grid">
                <Col xs={2} md={2}>Score <Badge>{comment.voteScore}</Badge></Col>
              </Row>
          
              <Row className="show-grid">
                <Col xs={2} md={2}><Button bsStyle="primary" onClick={() => this.goToComment(comment)}>Edit </Button></Col>
              </Row>
            </Grid>           
          </Panel>  
          )
        )}
        </div>
       </div> 
    )
  }
}

const mapStateToProps = ({comments}) => ({comments})

export default withRouter(connect(mapStateToProps)(Comments))
