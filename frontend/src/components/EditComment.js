import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as actions from '../actions/comments'
import {editServerComment} from '../utils/serverapi'
import SmallHeader from '../components/SmallHeader'
import { Button, 
  ButtonGroup, 
  Row, 
  Col, 
  Grid, 
  PageHeader, 
  Form, 
  FormGroup, 
  ControlLabel, 
  FormControl, 
  Panel,
  Badge } from 'react-bootstrap'


class EditComment extends Component {
  
  state = { }
  
  componentDidMount () {
    this.getComment()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.getComment()
    }
  }
  
   getComment = () => {
    const {commentId} = this.props.match.params
    if (commentId != null) {
      this.props.getCommentFromServer(commentId).then(data => {

        this.setState( {
            id: data.comment.id,
            parentId: data.comment.parentId,
            body: data.comment.body,
            author: data.comment.author,
            voteScore: data.comment.voteScore
            
        })

      })
     
    }
  }
  
  deleteComment = () => {
    this.props.deleteCommentOnServer(this.state.id).then(() =>  this.props.history.push(`/${this.props.post.category}/${this.props.post.id}`))
  }

  onUpdateClick() {
    
    const newComment = {
        id: this.state.id,
        parentId: this.state.parentId,
        author: this.state.author,
        body: this.state.body,
        voteScore:this.state.voteScore,
        deleted:false
      } 
    editServerComment(this.state.id,newComment)
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
          <Col xs={12} md={12}><PageHeader>Readable <small>Edit Comment</small></PageHeader></Col>
          </Row>
          <Row className="show-grid">
               <Col xs={12} md={12}><SmallHeader /></Col>
          </Row>
          <Row className="show-grid">
            <Col xs={8} md={8}>

              <Form>
                <FormGroup>
                  <ControlLabel>Author</ControlLabel>
                  <FormControl type="text" placeholder="Enter your name here ..."
                    value={this.state.author} onChange={(e) => this.onAuthorChange(e)}
                  />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Insert your Text here ...</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="textarea" 
                               value={this.state.body} onChange={(e) => this.onBodyChange(e)}/>
                </FormGroup>

              
              </Form>
              <Panel header="Voting">
                Score <Badge>{this.state.voteScore}</Badge>
                <Button onClick={() => {this.props.voteCommentOnServer(this.state.id,'upVote'); const d=this.state.voteScore +1 ;this.setState({voteScore:d})}}>Up Vote</Button>
                <Button onClick={() => {this.props.voteCommentOnServer(this.state.id,'downVote'); const d=this.state.voteScore -1 ;this.setState({voteScore:d})}}> Down Vote</Button>
              </Panel>
              <ButtonGroup>
                <Button bsStyle="primary" onClick={this.onUpdateClick.bind(this)}>Update</Button>
                <Button bsStyle="success" onClick={this.onCancelClick.bind(this)}>Cancel</Button>
                <Button bsStyle="danger" onClick={this.deleteComment} >Delete Comment</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Grid>
        
      </div>
 
    )
  }
}

const mapStateToProps = ({comment, post}) => ({comment, post})

export default withRouter(connect(mapStateToProps, actions)(EditComment))
