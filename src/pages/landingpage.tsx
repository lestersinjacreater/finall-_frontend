//import Container from "../components/Container"
import Navbar from "./landing page/navigation"
import Hero from "./landing page/hero"
import Cards from "./landing page/available"
import Steps from "./landing page/steps"
import Services from "./landing page/services"
import Footer from "./landing page/footer"


const LandingPage = () => {
  return (
    <div>
      
        <Navbar />
        <Hero />
        <Cards />
        <Steps />
        <Services />
        <Footer />
      
    </div>
  )
}

export default LandingPage
