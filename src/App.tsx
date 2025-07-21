import './App.css'
import TestConnection from './misc/TestConnection'
import CreatorCard from './components/CreatorCard'
import { useRoutes } from 'react-router'
import ShowCreators from './pages/ShowCreators'
import Navbar from './components/Navbar'
import Layout from './layouts/Layout'
import AddCreator from './pages/AddCreator'
import ViewCreator from './pages/VewCreator'
import EditCreator from './pages/EditCreator'
import Home from './pages/Home'


function App() {
  TestConnection()

  const routes = useRoutes([
    {
      path: '/*',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'showcreators', element: <ShowCreators /> },
        { path: 'addcreator', element: <AddCreator /> },
        { path: 'editcreator/:id', element: <EditCreator /> },
        { path: 'viewcreator/:id', element: <ViewCreator /> },
        // add more child routes here
      ],
    },
  ]);

  return routes;
}

export default App
