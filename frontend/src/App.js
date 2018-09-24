import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import MainPage from './components/MainPage'
import NewPost from './components/NewPost'
import NewComment from './components/NewComment'
import EditPost from './components/EditPost'
import EditComment from './components/EditComment'

class App extends Component {

	render () {
	    return (
	    
	    	<div>
	          <Switch> 
							<Route exact path='/' component={MainPage} />
							<Route exact path='/new' component={NewPost} />
							<Route exact path='/newComment' component={NewComment} />
							<Route exact path='/comments/:commentId' component={EditComment} />
							<Route exact path='/:category' component={MainPage} />
							<Route exact path='/:category/:postId' component={EditPost} />
	          </Switch>
	   		</div>
	    )
	}
}
export default App