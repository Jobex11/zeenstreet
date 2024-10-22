
import cardbg from "../../../assets/images/card_bg.svg"
import { Card } from '../../ui/card';

function TaskCard({ children }: { children: React.ReactNode }) {
    return (
        <Card style={{
            backgroundImage: `url(${cardbg})`,
            backgroundPosition: "center",
            backgroundRepeat: 'no-repeat',
            backgroundSize: "cover"
        }} className='rounded-xl min-h-[194px] min-w-[328px] shadow p-0 poppins '>
            {children}
        </Card>
    )
}

export default TaskCard
