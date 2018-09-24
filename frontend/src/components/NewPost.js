import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getPostFromServer} from '../actions/posts'
import {getCategoriesFromServer} from '../actions'
import {addServerPost} from '../utils/serverapi'
import Uuid from 'uuid-lib'
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
  } from 'react-bootstrap'


class NewPost extends Component {
 
  state = {
    title: '',
    category: '',
    author: '',
    body: '',
  }

  onAddClick() {
    const newPost = {
        id: Uuid.raw(),
        timestamp: Date.now(),
        title: this.state.title,
        category: this.state.category,
        author: this.state.author,
        body: this.state.body,
        voteScore:1,
        deleted:false
      } 
    addServerPost(newPost)
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

  render () {
    const optionList = this.props.categories.map(category => ( <option key={category.name} value={category.name}>{category.name}</option> ) )
    return (
      <div>

        <Grid>
          <Row className="show-grid">
          <Col xs={12}><PageHeader>Readable <small>Add Post</small></PageHeader></Col>
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

              <ButtonGroup>
                <Button bsStyle="primary" onClick={this.onAddClick.bind(this)}>Submit</Button>
                <Button  bsStyle="success" onClick={this.onCancelClick.bind(this)}>Cancel</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({post, categories}) => ({post, categories})
const mapDispatchToProps = {getPostFromServer, getCategoriesFromServer}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost))
