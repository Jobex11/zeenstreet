import { setActiveScreen } from '@/hooks/redux/slices/game-screens-slice';
import { SCREENS } from '@/lib/utils';
import avatar from '@assets/images/icons/users_avatar.svg'
import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
const ShareFormatter = lazy(() =>
  import("@/components/shared/shareFormatter").then((mod) => ({ default: mod.ShareFormatter }))
);

interface GamePhase1Props {
  shares: number;
  game_date: string;
  creator: {
    name: string;
    avatar?: string;
  };
  earning: number;
}


function GamePhase1({ creator, earning, game_date, shares }: GamePhase1Props) {

  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(setActiveScreen(SCREENS.GAME_SCREEN));
    }, 5000);
  })
  return (
    <section className={"flex flex-col h-full px-3 justify-center pt-20 game_phase_1"}>
      <div className="absolute inset-0 bg-[#0f0543] opacity-60" />

      <div className={"flex flex-col justify-around h-full gap-3 relative pt-16 "}>

        <h1 className="text-white text-xl atkinson">
          Next Game <br />
          <span className="text-orange-600 font-extrabold text-2xl">{game_date}</span><br />
          <span>$SHARES <ShareFormatter shares={shares} /></span>
        </h1>

        <div className="flex flex-row items-center justify-between px-2">
          <div className="flex items-center flex-row gap-1">
            <img src={avatar} alt="" className="h-10 w-10 rounded-full border" />
            <h1 className="text-white text-sm atkinson">{creator.name}</h1>
          </div>

          <div className="flex flex-col items-center text-white">
            <h1 className="text-xl atkinson">EARNINGS</h1>
            <h1 className="font-bold atkinson">${earning}</h1>
          </div>
        </div>

      </div>

    </section>
  )
}

export default GamePhase1
