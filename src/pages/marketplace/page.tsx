import ComingSoon from "../../components/common/main-app/coming-soon";
import MainappLayout from "../../components/common/main-app/main-app-layout";
import marketImg from "../../assets/images/icons/market_place.svg";

function Marketplace() {
  return (
    <MainappLayout>
         <ComingSoon image={marketImg} alt="an Image showing market place" name="Marketplace"/>
    </MainappLayout>

  )
}

export default Marketplace
