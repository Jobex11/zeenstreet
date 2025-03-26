import GameLayout from "@/components/common/main-app/game"
import WordPuzzle from "@/components/common/main-app/game/game-screen";
import GamePhase1 from "@/components/common/main-app/game/phases/phase_1"
import GamePhase2 from "@/components/common/main-app/game/phases/phase_2"
import WelcomeScreen from "@/components/common/main-app/game/welcome-screen"
import TimeUpScreen from "@/components/common/main-app/game/time-up-screen"
import CheckpointScreen from "@/components/common/main-app/game/checkpoint-screen"
import { screenVariants, SCREENS } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

function Games() {
  const activeScreen = useSelector((state: RootState) => state.screen.activeScreen);

  const shouldShowBottomNav = () => {
    const hiddenScreens = ["game-screen", "time-up-screen", "eliminated", "checkpoint"];
    return !hiddenScreens.includes(activeScreen);
  };

  return (
    <GameLayout
      show_layout={true}
      show_header={false}
      show_bottom_nav={shouldShowBottomNav()}
      shares={0.00}
      hide_video_tip={activeScreen !== "game-screen"}>

      <AnimatePresence mode="wait">
        {activeScreen === SCREENS.WELCOME && (
          <motion.div
            key={SCREENS.WELCOME}
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col h-full"
          >
            <WelcomeScreen />
          </motion.div>
        )}

        {activeScreen === SCREENS.PHASE_1 && (
          <motion.div
            key={SCREENS.PHASE_1}
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col h-full"
          >
            <GamePhase1
              shares={200}
              game_date={"TODAY, 3PM UTC"}
              creator={{
                name: "RegisMaximus"
              }}
              earning={720.21}
            />
          </motion.div>
        )}

        {activeScreen === SCREENS.PHASE_2 && (
          <motion.div
            key={SCREENS.PHASE_2}
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col h-full"
          >
            <GamePhase2 time={"04h:18m:27s"} status={"waiting"} />
          </motion.div>
        )}

        {activeScreen === SCREENS.TIME_UP && (
          <motion.div
            key={SCREENS.TIME_UP}
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col h-full"
          >
            <TimeUpScreen
              total_players={18000000}
              eliminated_players={700000}
              end_game={true}
              rewards={{
                coins: 100,
                checkpoint: 500,
                booster: 150
              }}
            />
          </motion.div>
        )}

        {activeScreen === SCREENS.CHECK_POINT && (
          <motion.div
            key={SCREENS.CHECK_POINT}
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col h-full"
          >
            <CheckpointScreen
              total_players={18000000}
              available_players={700000}
              rewards={{
                coins: 100,
                golds: 500,
                booster: 150
              }}
              screen_index="1/24"
            />
          </motion.div>
        )}
        {activeScreen === SCREENS.GAME_SCREEN && (
          <motion.div
            key={SCREENS.GAME_SCREEN}
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col h-full"
          >
            <WordPuzzle
              images={
                ["https://i.pinimg.com/736x/bb/6c/52/bb6c5247b5b71ae58383594a93f76007.jpg",
                  "https://i.pinimg.com/736x/7f/2e/3d/7f2e3d179b2d77957a0a4e2846cc0765.jpg",
                  "https://i.pinimg.com/736x/05/fc/2c/05fc2c2c0f7a61339ad2873d53594ea5.jpg",
                  "https://i.pinimg.com/736x/49/aa/a4/49aaa493788c6d7e88da40eb347b288e.jpg"]}
              word="SECURITY"
              letters={["S", "E", "C", "U", "R", "I", "T", "Y", "X", "Z", "M", "Q", "A", "P"]}
              screen_index="1/24"
              stepsCount={[1, 2, 3, 4]}
              currentStep={3}
              total_players={2000000}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </GameLayout>
  )
}

export default Games
