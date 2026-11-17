import HomeNavbar from "./components/Navbar"
import Home from "./pages/Home"
import { ToastContainer, Zoom } from 'react-toastify';


function App() {

  return (
    <>
      {/* <HomeNavbar
        color='success'
        light='True'
        dark='True'
        full='True'
        expand='md'
        container='fluid'
      /> */}
      <Home />
      <ToastContainer
        position="top-center"
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
    </>

  )
}

export default App