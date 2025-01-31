import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App.jsx'
import JobPostings from './pages/JobPosting.jsx'
import store from './app/store.js'
import JobDetails from './pages/JobDetails.jsx'


const routes = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/createJob",
    element:<JobPostings/>
  },
  {
    path:"/jobs/:id",
    element:<JobDetails/>
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <RouterProvider router={routes}/>
  </Provider>
   
  </StrictMode>,
)
