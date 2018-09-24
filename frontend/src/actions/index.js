import { getServerCategories } from '../utils/serverapi'

import * as ACTIONS from './types'



export const getCategoriesFromServer = () => dispatch => (
   getServerCategories().then(categories => dispatch(getCategories(categories))
  )
)

function getCategories (categories) {
  return {
  	type: ACTIONS.GET_CATEGORIES, 
  	categories
  }
}
