import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getCommentFromServer } from '../actions/comments'
import {addServerComment} from '../utils/serverapi'
import Uuid from 'uuid-lib'
import SmallHeader from '../components/SmallHeader'
import { Button, 
Grid,
Row,
Col,
PageHeader,
Form,
FormGroup,
ControlLabel,
FormControl,
ButtonGroup,

} from 'react-bootstrap'

class NewComment extends Component {
  

  state = {
    author: 'None',
    body: 'None',
  }

  onAddClick() {
      
    const newComment = {
        id: Uuid.raw(),
        parentId: this.props.post.id,
        author: this.state.author,
        body: this.state.body,
        voteScore:1,
        deleted:false
      } 
    addServerComment(newComment)
    this.props.history.push(`/${this.props.post.category}/${this.props.post.id}`)

  }

  onCancelClick() {
    this.props.history.push(`/${this.props.post.category}/${this.props.post.id}`)
  }

  onAuthorChange(e) {
    this.setState({ author: e.target.value })
  }

  onBodyChange(e) {
    this.setState({ body: e.target.value })
  }


  render () {
 
    return (
       <div>
        <Grid>
          <Row className="show-grid">
          <Col xs={12} md={12}><PageHeader>Readable <small>Add Comment</small></PageHeader></Col>
          </Row>
          <Row className="show-grid">
               <Col xs={12} md={12}><SmallHeader /></Col>
          </Row>
          <Row className="show-grid">
            <Col xs={8} md={8}>

              <Form>
                <FormGroup>
                  <ControlLabel>Author</ControlLabel>
                  <FormControl type="text" placeholder="Enter your name ..."
                    value={this.state.author} onChange={(e) => this.onAuthorChange(e)}
                  />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Insert your Text here ...</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="textarea" 
                               value={this.state.body} onChange={(e) => this.onBodyChange(e)}/>
                </FormGroup>

              <ButtonGroup>
                <Button bsStyle="primary" onClick={this.onAddClick.bind(this)}>Submit</Button>
                <Button  bsStyle="success" onClick={this.onCancelClick.bind(this)}>Cancel</Button>
              </ButtonGroup>
              </Form>
            </Col>
          </Row>
        </Grid>
      </div>
    
    )
  }
}

const mapStateToProps = ({post, comment}) => ({post, comment})
const mapDispatchToProps = {getCommentFromServer}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewComment))
