
import cardbg from "../../../assets/images/card_bg.svg"
import { Card } from '../../ui/card';

function TaskCard({ children, className }: { children: React.ReactNode, className?:string }) {
    return (
        <Card style={{
            backgroundImage: `url(${cardbg})`,
            backgroundPosition: "center",
            backgroundRepeat: 'no-repeat',
            backgroundSize: "cover"
        }} className={`rounded-xl min-h-[194px] min-w-[328px] bg-[rgba(23,23,23,1)] shadow p-0 poppins ${className}`}>
            {children}
        </Card>
    )
}

export default TaskCard
