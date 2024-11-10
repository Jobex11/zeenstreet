import MainappLayout from "../../components/common/main-app/main-app-layout"
import TelegramLayout from "../../components/common/Telegram.app.layout"
import Home from "../../components/customs/main-app/home"


function HomePage() {
  return (
    <MainappLayout>
        <TelegramLayout><Home/></TelegramLayout>
        
    </MainappLayout>

  )
}

export default HomePage

