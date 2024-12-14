import { LazyLoadImage } from "react-lazy-load-image-component";
import dotsbg from "@assets/images/dotted-bg.png";
import notificationImage from "@assets/images/notification_img.png"

function MailNotification() {

  const notifications = [
    {
      img: notificationImage,
      date: "June 31, 2024",
      title: "Great news! A new task has been added",
      username: "@prashant",
      subtitle: "New tasks are available to do now",
      description: "This comprehensive course dives into the world of digital marketing...",
      label: "Task Added"
    },
    {
      img: notificationImage,
      date: "June 31, 2024",
      title: "Update: A new challenge is available",
      username: "@alex",
      subtitle: "Check out the new challenge section for exciting tasks",
      description: "Complete a set of creative tasks and improve your marketing skills.",
      label: "Challenge"
    },
    {
      img: notificationImage,
      date: "June 31, 2024",
      title: "Great news! A new task has been added",
      username: "@prashant",
      subtitle: "Complete this task to earn rewards",
      description: "This comprehensive course dives into the world of digital marketing...",
      label: "Reward Task"
    },
    {
      img: notificationImage,
      date: "June 31, 2024",
      title: "Don't miss out on the new daily task",
      username: "@susan",
      subtitle: "A new task awaits you",
      description: "Learn new skills in digital marketing and finish tasks in record time.",
      label: "Daily Task"
    },
    {
      img: notificationImage,
      date: "June 31, 2024",
      title: "Special Offer: Complete the task for a bonus",
      username: "@john_doe",
      subtitle: "Finish this task to earn extra points",
      description: "Gain additional rewards for completing tasks ahead of time.",
      label: "Special Bonus"
    },
    {
      img: notificationImage,
      date: "June 31, 2024",
      title: "Special Offer: Complete the task for a bonus",
      username: "@john_doe",
      subtitle: "Finish this task to earn extra points",
      description: "Gain additional rewards for completing tasks ahead of time.",
      label: "Special Bonus"
    },
    {
      img: notificationImage,
      date: "June 31, 2024",
      title: "Special Offer: Complete the task for a bonus",
      username: "@john_doe",
      subtitle: "Finish this task to earn extra points",
      description: "Gain additional rewards for completing tasks ahead of time.",
      label: "Special Bonus"
    }
  ];

  return (
    <div className='flex flex-col min-h-full'>
      <div style={{
        backgroundImage: `url(${dotsbg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }} className='flex flex-col flex-1 py-3 '>
        <div className="flex flex-col px-4 ">
          <div className="flex items-center justify-between py-3 inter">
            <h1 className="text-xl font-semibold text-white ">Notificaions</h1>

            <div className="cursor-pointer"><h1 className="text-[10px] font-medium  text-white">Mark all as read</h1></div>
          </div>

          {/* notifications */}
          <div className="flex flex-col gap-3 pb-[8rem]">
            {notifications.map((notify, id) => (
              <div key={id} className="py-5 flex items-center gap-3 border-b border-[#3E3D3D] inter">
                <div className=" rounded-full h-[50px] w-[50px]">
                  <LazyLoadImage effect="blur" src={notify.img} alt="" className="h-full w-full object-cover object-center" />
                </div>

                <div>
                  <h1 className="text-[#D25804] text-[8px] pb-1 font-medium">{notify.date}</h1>
                  <h1 className="text-[8px] font-semibold text-[#FFFFFF] line-clamp-1">{notify.title} <span className="text-[#9EA6FF] text-[8px] font-semibold">{notify.username}</span></h1>
                  <h1 className="text-xs font-bold text-[#FFFFFF] line-clamp-1">{notify.subtitle}</h1>
                  <h1 className="text-[8px] italic text-[#FFFFFF] font-normal line-clamp-1">{notify.description}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MailNotification
