import ComingSoon from "@components/common/main-app/coming-soon"
import MainappLayout from "@components/common/main-app/main-app-layout"
import gameImg from "@assets/images/icons/games.svg"

function Games() {
  return (
    <MainappLayout>
           <ComingSoon image={gameImg} alt="an Image showing" name="Games"/>
    </MainappLayout>

  )
}

export default Games
