// import { backButton, closeMiniApp, disableVerticalSwipes, enableClosingConfirmation, init, setMiniAppBottomBarColor, setMiniAppHeaderColor } from "@telegram-apps/sdk";
// import { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// interface LayoutProps {
//     children: React.ReactNode
// }

// const TelegramLayout = ({ children }: LayoutProps) => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     useEffect(() => {
//         init();

//         // Configure Header Color
//         setMiniAppHeaderColor('#292734');
//         setMiniAppBottomBarColor("#292734")
//         enableClosingConfirmation()
//         disableVerticalSwipes()
//         // Back Button Logic
//         if (backButton.isMounted() && location.pathname !== '/') {
//             backButton.show();
//         } else {
//             backButton.hide();
//         }


//         const handleBackButtonClick = () => {
//             if (history.length > 1) {
//                 navigate(-1)
//             } else {
//                 closeMiniApp();
//             }
//         };


//         return () => {
//             backButton.offClick(handleBackButtonClick);

//         };
//     }, [location, navigate]);

//     return (
//         <main>{children}</main>
//     );
// };

// export default TelegramLayout;
