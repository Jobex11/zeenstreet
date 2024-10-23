import dotsbg from "../../../assets/images/dotted-bg.png";
import trophy from "../../../assets/images/icons/trophy.png";
import sprinkledStars from "../../../assets/images/icons/sprinkled_stars.png";
import rankBadge from "../../../assets/images/icons/rank_badge.svg";
import goldCoin from "../../../assets/images/icons/gold_coin.svg";
import eclipse from "../../../assets/images/eclipse.png"
import { ShareFormatter } from "../../common/shareFormatter";


function Ranks() {

  const ranks = [
    { rank: "Rank 1", shares: 4000000 },
    { rank: "Rank 2", shares: 3000000 },
    { rank: "Rank 3", shares: 2000000 },
    { rank: "Rank 4", shares: 1000000 },
    { rank: "Rank 5", shares: 800000 },
    { rank: "Rank 6", shares: 500000 },
    { rank: "Rank 7", shares: 100500 }
  ]
  return (
    <div className='flex flex-col min-h-full'>
      <div style={{
        backgroundImage: `url(${dotsbg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }} className='flex flex-col flex-1 pb-3 '>

        {/* rank trophy  */}
        <div>
          <div style={{
            backgroundImage: `url(${eclipse}), url(${sprinkledStars})`,
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundSize: "cover, cover",
            backgroundPosition: "center, center",
            backgroundBlendMode: "multiply",
          }} className='h-[271px] flex flex-col items-center justify-center'>
            <img src={trophy} alt="Rank Trophy" className='h-full w-full object-center object-contain' />
            <h1 className="text-[#FEFEFF] text-xl font-semibold work-sans py-1">Rank 0</h1>
          </div>
     
        </div>

        <div className='px-4 flex flex-col gap-8 pb-[8rem]'>

          {/* rank lists */}
          <div className="flex flex-col mt-3">
            {ranks.map((rank) => (
              <div key={rank.rank} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="h-[49px] w-[49px]">
                    <img src={rankBadge} alt="Rank badge" className="min-h-full min- w-full object-center object-contain" />
                  </div>
                  <h1 className="text-[#FFFFFF] text-[17px] font-bold jakarta">{rank.rank}</h1>
                </div>
                <div><h1 className="font-medium text-[17px] jakarta flex items-center gap-1 text-white"><img src={goldCoin} alt="gold" className="h-[15px] w-[15px] object-cover object-center" />{ShareFormatter(rank.shares)} Gold</h1></div>
              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  )
}

export default Ranks


