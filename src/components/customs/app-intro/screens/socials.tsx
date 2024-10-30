import { useState, useEffect } from "react";
import { SiTelegram } from "react-icons/si";
import { RiTwitterXLine } from "react-icons/ri";
import { TextButton } from "../../../common/buttons/Textbutton";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../../assets/images/icons/ravegene_logo_lg.png";
import { Button } from "../../../ui/button";
import { Fade } from "react-awesome-reveal";

export const Socials = () => {
    const navigate = useNavigate()

    // Load persisted state from localStorage
    const loadConfirmedAccounts = () => {
        const storedState = localStorage.getItem("confirmedAccounts");
        return storedState ? JSON.parse(storedState) : { Youtube: false, Telegram: false, X: false };
    };

    const [confirmedAccounts, setConfirmedAccounts] = useState<Record<string, boolean>>(loadConfirmedAccounts);

    // Persist state to localStorage on change
    useEffect(() => {
        localStorage.setItem("confirmedAccounts", JSON.stringify(confirmedAccounts));
    }, [confirmedAccounts]);

    const allConfirmed = Object.values(confirmedAccounts).every(Boolean);

    const socialHandles = [
        {
            name: "Youtube",
            title:"",
            icon: (
                <svg width="117" height="26" viewBox="0 0 117 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M36.2134 4.07133C36.001 3.28434 35.5866 2.56686 35.0116 1.99038C34.4365 1.4139 33.7208 0.998535 32.9358 0.785656C30.0619 0 18.4965 0 18.4965 0C18.4965 0 6.93055 0.0238422 4.05708 0.809498C3.27211 1.02241 2.55649 1.43779 1.98148 2.01427C1.40647 2.59075 0.992149 3.30821 0.779778 4.09518C-0.0894882 9.21443 -0.426731 17.0145 0.803559 21.9287C1.01593 22.7156 1.43025 23.4331 2.00526 24.0096C2.58027 24.586 3.2959 25.0014 4.08086 25.2143C6.95456 26 18.5202 26 18.5202 26C18.5202 26 30.0859 26 32.9596 25.2143C33.7446 25.0014 34.4602 24.586 35.0352 24.0096C35.6102 23.4331 36.0245 22.7156 36.2369 21.9287C37.1535 16.8024 37.4362 9.00712 36.2131 4.07156" fill="#FF0000" />
                    <path d="M111.883 7.38973C113.148 7.38973 114.102 7.63054 114.769 8.08827C115.437 8.54615 115.914 9.26904 116.201 10.257C116.487 11.2448 116.606 12.5938 116.606 14.3287V17.1479H110.476V18.0151L110.572 20.4005C110.643 20.9306 110.762 21.3162 110.953 21.557C111.144 21.798 111.454 21.9184 111.86 21.9184C112.408 21.9184 112.79 21.7017 112.981 21.2681C113.195 20.8343 113.291 20.1114 113.314 19.1236L116.487 19.3164C116.511 19.4609 116.511 19.6537 116.511 19.8945C116.511 21.4124 116.105 22.545 115.27 23.2918C114.436 24.0386 113.291 24.4242 111.788 24.4242C109.975 24.4242 108.711 23.8461 107.995 22.7137C107.28 21.5811 106.898 19.798 106.898 17.4128V14.4974C106.979 10.4015 107.692 7.40168 111.883 7.38973ZM67.7802 7.70292V19.7741C67.7802 20.497 67.8516 21.0271 68.0186 21.3403C68.3573 22.0101 69.2351 21.8389 69.7121 21.509C69.9875 21.3208 70.2094 21.0634 70.3561 20.7622V7.70269H74.0055V24.159H71.1432L70.8332 22.1351H70.7617C69.9746 23.6531 68.8056 24.424 67.2554 24.424C64.8692 24.418 64.2852 22.6813 64.1462 20.9175L64.1371 20.7932C64.1199 20.526 64.1098 20.2585 64.1069 19.9908V7.70292H67.7802ZM86.5998 7.70292V19.7741C86.5998 20.497 86.6712 21.0271 86.8382 21.3403C87.1772 22.0101 88.0548 21.8389 88.5318 21.509C88.8071 21.3208 89.0291 21.0634 89.1758 20.7622V7.70269H92.8252V24.159H89.9628L89.6528 22.1351H89.5814C88.7943 23.6531 87.6253 24.424 86.075 24.424C83.6888 24.418 83.1049 22.6813 82.9659 20.9175L82.9568 20.7932C82.9396 20.526 82.9295 20.2585 82.9265 19.9908V7.70292H86.5998ZM57.1895 7.38973C58.3822 7.38973 59.3601 7.63054 60.0758 8.13652C60.7912 8.6425 61.3398 9.41365 61.6738 10.4736C62.0077 11.5339 62.1747 12.9553 62.1747 14.7143V17.0994C62.1747 18.8584 62.0077 20.2559 61.6738 21.3159C61.3398 22.3764 60.8151 23.1473 60.0758 23.6533C59.3365 24.1351 58.3344 24.4001 57.0942 24.4001C55.806 24.4242 54.8042 24.1593 54.0649 23.6774C53.3256 23.1714 52.8006 22.4003 52.4908 21.3403C52.1805 20.2801 52.0374 18.8825 52.0374 17.1238V14.7382C52.0374 12.9792 52.2044 11.5336 52.5622 10.4734C52.92 9.3893 53.4685 8.61815 54.2319 8.13652C54.9951 7.65444 55.973 7.3895 57.1895 7.3895M98.5499 0.787842V9.46168H98.5738C98.9077 8.83529 99.3369 8.32931 99.9334 7.94373C100.49 7.56564 101.147 7.36432 101.818 7.3656C102.7 7.3656 103.368 7.60641 103.869 8.06414C104.37 8.54622 104.728 9.29302 104.942 10.3291C105.15 11.3328 105.269 12.7209 105.276 14.4714L105.276 14.6421V17.2442C105.276 19.6776 104.966 21.4848 104.394 22.6413C103.798 23.7978 102.891 24.3762 101.651 24.3762C100.959 24.3762 100.339 24.2075 99.7664 23.8943C99.2603 23.5962 98.8406 23.1689 98.5494 22.6553L98.5021 22.5689H98.4307L98.049 24.1351H95.0197V0.788072L98.5499 0.787842ZM83.952 1.63114V4.61855H80.3264V24.159H76.7487V4.61878H73.0993V1.63137L83.952 1.63114ZM44.6191 1.63114L44.6214 1.64034C44.6562 1.79682 45.1385 3.96252 45.6689 6.48576L45.7108 6.68567L45.774 6.98784L45.8164 7.19074L45.8375 7.29253L45.8798 7.49658L45.901 7.59883L45.9431 7.80357L46.0045 8.10297C46.3628 9.85024 46.7047 11.6026 46.9092 12.859H47.0047C47.2006 11.7319 47.4851 10.2896 47.7886 8.81691L47.8682 8.43225C47.9081 8.23954 47.9483 8.04714 47.9888 7.85504L48.0511 7.55701C48.4632 5.60543 48.8876 3.65652 49.3243 1.71042L49.3311 1.6794L49.342 1.63114H52.9914L48.7695 16.8347V24.1351H45.1678V16.8586H45.1439L40.9697 1.63091L44.6191 1.63114ZM57.1179 9.94353C56.617 9.94353 56.283 10.2087 56.0685 10.7629C55.854 11.3172 55.7585 12.1602 55.7585 13.3411V18.4731C55.7585 19.6778 55.8538 20.5691 56.0446 21.0995C56.2356 21.6295 56.5933 21.8945 57.1179 21.8945C57.6188 21.8945 57.9766 21.6295 58.1913 21.0995C58.4061 20.5691 58.5014 19.6778 58.5014 18.4731V13.3409C58.5014 12.1602 58.4058 11.2928 58.1913 10.7627C57.9766 10.2087 57.6188 9.94353 57.1179 9.94353ZM99.1939 10.4256C98.9031 10.6968 98.6964 11.0311 98.5733 11.4491L98.5499 11.5339V20.8823C98.8456 21.3883 99.2655 21.7256 100.005 21.7498C100.386 21.7498 100.696 21.6052 100.935 21.3162C101.174 21.0271 101.34 20.5452 101.436 19.8704C101.528 19.2228 101.575 18.331 101.579 17.1948V14.9071C101.579 13.606 101.531 12.6182 101.46 11.9194C101.364 11.2207 101.245 10.7147 101.031 10.4256C100.615 9.82313 99.7186 9.83048 99.1939 10.4256ZM111.812 9.87138C111.406 9.89543 111.12 10.0159 110.953 10.2328C110.762 10.4736 110.643 10.8351 110.572 11.3652C110.501 11.8845 110.477 13.6998 110.476 13.7724V14.9553H113.148V13.9121V13.9321C113.146 14.2968 113.138 13.7205 113.122 13.013L113.12 12.9178C113.105 12.296 113.083 11.6028 113.052 11.3652C112.981 10.811 112.861 10.4254 112.671 10.2087C112.48 9.99179 112.193 9.87138 111.812 9.87138" fill="#282828" />
                    <path d="M13.3939 19.6969L25.2121 13.0001L13.3939 6.30298V19.6969Z" fill="white" />
                </svg>
            ),
            path: "youtube.com/@thezenstreet.official",
            tag: "Subscribe",
            style: {
                bg: "bg-[#FF0000] hover:bg-red-600",
                text: "text-black font-bold text-2xl aqum"
            }
        },
        {
            name: "Telegram",
            title:"Telegram",
            icon: <SiTelegram size={30} color={"#229ED9"} />,
            path: "t.me/thezenstreet",
            tag: "Join",
            style: {
                bg: "bg-[#229ED9] hover:bg-[#1c86b7] ",
                text: "text-blue-400 uppercase font-bold text-[13px] aqum"
            }
        },
        {
            name: "X",
            title:"X",
            icon: <RiTwitterXLine size={30} color={"black"} />,
            path: "x.com/thezenstreet?t=KBcpyrKI6WgVMCaXndVK5g&s=09",
            tag: "Follow",
            style: {
                bg: "bg-[#0F0F0F] hover:bg-black",
                text: "text-white "
            }
        }
    ];

    const handleConfirm = (name: string) => {
        setConfirmedAccounts(prevState => ({
            ...prevState,
            [name]: true
        }));
    };
    useEffect(() => {
        console.log(confirmedAccounts);  // Check if all accounts are updated
        console.log(allConfirmed);       // Check if all are confirmed
    }, [confirmedAccounts, allConfirmed]);
    

    return (
        <div className="flex flex-col justify-evenly flex-1 w-full min-h-full p-4">
            <div className="flex flex-col gap-4 items-center">
                <div className="relative h-[139px] w-[139px]">
                    <img src={Logo} alt="" className="h-full w-full object-contain" />
                </div>
            </div>
            <Fade>
            <div className="flex flex-col gap-2">
                {/* Social media handles */}
                {socialHandles.map((handles) => (
                    <div key={handles.tag} className="flex flex-col items-center mb-8 gap-2 w-full">
                        <div className="flex rounded-xl items-center gap-2 h-16 w-full max-w-[282.67px]  bg-white">
                            <div className="flex items-center w-[60%] p-5 gap-2">
                                <span>{handles.icon}</span>
                                <h1 className={handles.style.text}>{handles.title}</h1>
                            </div>
                            <Link to={`https://${handles.path}`} target="_blank" className={`w-[40%] flex items-center justify-center rounded-l-none rounded-r-xl border-none h-full ${handles.style.bg}`}>
                                <Button
                                    onClick={() => handleConfirm(handles.name)}
                                    className="bg-transparent hover:bg-transparent shadow-none text-white aqum text-[13px] font-bold"
                                >
                                    {handles.tag}
                                </Button>
                            </Link>
                        </div>

                        {/* Confirm Button */}
                        <Button
                            disabled={!confirmedAccounts[handles.name]}
                            className="bg-[#D25804] hover:bg-orange-600 text-sm mt-3 uppercase font-medium max-w-[85px] h-6 mx-auto text-white" >
                            Confirm
                        </Button>

                    </div>
                ))}

                <blockquote className="tahoma text-xs font-medium text-center py-2 uppercase text-[#C2C2C2]">
                    Complete these quests to claim your <br/> shares and Proceed
                </blockquote>
            </div>
            </Fade>
            {/* Proceed Button */}
            <TextButton
                name={"Proceed"}
                disabled={!allConfirmed}
                onClick={() => navigate("/home")}
                className={"uppercase mt-10"}
            />
        </div>
    );
};


