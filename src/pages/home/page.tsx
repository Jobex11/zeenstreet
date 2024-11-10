import MainappLayout from "../../components/common/main-app/main-app-layout"
import ScrollableComponent from "../../components/common/scrollenable"
import Home from "../../components/customs/main-app/home"


function HomePage() {
  return (
    <MainappLayout>
      <ScrollableComponent>
         <Home/>
      </ScrollableComponent>
    </MainappLayout>

  )
}

export default HomePage

