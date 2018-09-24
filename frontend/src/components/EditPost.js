import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getPostFromServer,votePostOnServer,deletePostOnServer} from '../actions/posts'
import {getCommentsFromServer} from '../actions/comments'
import {getCategoriesFromServer} from '../actions'
import {editServerPost} from '../utils/serverapi'
import Comments from '../components/Comments'
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

class EditPost extends Component {
  
  state = { }

  componentDidMount () {
    this.getPost()
    this.props.getCategoriesFromServer()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.getPost()
    }
  }
 
  getPost = () => {
    const {postId} = this.props.match.params
    if (postId != null) {
      this.props.getPostFromServer(postId).then(data => {
        this.setState( {
          id: data.post.id,
          timestamp: data.post.timestamp,
          title: data.post.title,
          body: data.post.body,
          author: data.post.author,
          category: data.post.category,
          voteScore: data.post.voteScore,
          deleted: data.post.deleted
        })
      })
      this.props.getCommentsFromServer(postId)
    }
  }
  
  deletePost = () => {
    this.props.deletePostOnServer(this.state.id).then(() => this.props.history.push('/'))
  }

  onUpdateClick() {
    const newPost = {
        id: this.state.id,
        timestamp: this.state.timestamp,
        title: this.state.title,
        category: this.state.category,
        author: this.state.author,
        body: this.state.body,
        voteScore:this.state.voteScore,
        deleted:false
      } 
    editServerPost(this.state.id,newPost)
    this.props.history.push('/')
  }

  onCancelClick() {
    this.props.history.push('/')
  }


  onTitleChange(e) {
    this.setState({ title: e.target.value })
  }

  onAuthorChange(e) {
    this.setState({ author: e.target.value })
  }

  onBodyChange(e) {
    this.setState({ body: e.target.value })
  }

  onCategoryChange = (e) => {
    this.setState({
      category: e.target.value
    })
    
  }
  
  newComment = () => {
    this.props.history.push('/newComment')
  }

  render () {
     const optionList = this.props.categories.map(category => ( 
        <option key={category.name} value={category.name}>{category.name}</option> )
        )

    return (
     <div>
        {this.state.id == undefined ? (
          <Grid>
          <Row className="show-grid">
              <Col xs={12} md={12}><PageHeader>Readable <small>Edit Post</small></PageHeader></Col>
          </Row>
          <Row >
            <h1>DELETED</h1><br/><Button bsStyle='success' onClick={this.onCancelClick.bind(this)}>Go Back</Button>
          </Row>
          </Grid>
        ):( 
        <Grid>
          <Row className="show-grid">
          <Col xs={12} md={12}><PageHeader>Readable <small>Edit Post</small></PageHeader></Col>
          </Row>
           <Row className="show-grid">
               <Col xs={12} md={12}><SmallHeader /></Col>
          </Row>
          <Row className="show-grid">
            <Col xs={8} md={8}>

              <Form>
                <FormGroup>
                  <ControlLabel>Title</ControlLabel>
                  <FormControl type="text" placeholder="Enter title here ..."
                    value={this.state.title} onChange={(e) => this.onTitleChange(e)}
                  />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Select Category</ControlLabel>
                  <FormControl componentClass="select" placeholder="select"
                               value={this.state.category} onChange={this.onCategoryChange}>
                      {optionList}
                  </FormControl>
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Insert your Text here ...</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="textarea" 
                               value={this.state.body} onChange={(e) => this.onBodyChange(e)}/>
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Author</ControlLabel>
                  <FormControl type="text" placeholder="Enter your name here ..."
                    value={this.state.author} onChange={(e) => this.onAuthorChange(e)}
                  />
                </FormGroup>
              </Form>
              <Panel header="Voting">
                Score <Badge>{this.state.voteScore}</Badge>
                <Button onClick={() => {this.props.votePostOnServer(this.state.id,'upVote'); const d=this.state.voteScore +1 ;this.setState({voteScore:d})}}>Up Vote</Button>
                <Button onClick={() => {this.props.votePostOnServer(this.state.id, 'downVote'); const d=this.state.voteScore -1 ;this.setState({voteScore:d})}}> Down Vote</Button>
              </Panel>
              <ButtonGroup>
                <Button bsStyle="primary" onClick={this.onUpdateClick.bind(this)}>Update</Button>
                <Button bsStyle="success" onClick={this.onCancelClick.bind(this)}>Cancel</Button>
                <Button bsStyle="danger" onClick={this.deletePost} >Delete Post</Button>
                <Button bsStyle="info" onClick={this.newComment}>Add new comment</Button>

              </ButtonGroup>
            </Col>
          </Row>
          
          <Row>
            <Col xs={8} md={8}>
              <Comments />
            </Col>

          </Row>
           
        </Grid>
        )}
        
      </div>
    )
  }
}

const mapStateToProps = ({post, categories, comments}) => ({post, categories, comments})
const mapDispatchToProps = {getPostFromServer, getCommentsFromServer,deletePostOnServer,votePostOnServer,getCategoriesFromServer }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost))
