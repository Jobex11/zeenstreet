import GameLayout from "@/components/common/main-app/game"
import WelcomeScreen from "@/components/common/main-app/game/welcome-screen"

function Games() {
  return (
    <GameLayout show_layout={true} show_header={true} show_bottom_nav={true}>
      <section>
        <WelcomeScreen />
      </section>
    </GameLayout>
  )
}

export default Games
