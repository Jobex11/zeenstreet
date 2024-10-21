
import cardbg from "../../../assets/images/card_bg.png"
import { Card } from '../../ui/card';

function TaskCard() {
    return (
        <Card style={{
            backgroundImage: `url(${cardbg})`,
            backgroundPosition: "center",
            backgroundRepeat: 'no-repeat',
            backgroundSize: "cover"
        }} className='rounded-xl min-h-[194px] min-w-[328px] shadow'>
        
        </Card>
    )
}

export default TaskCard
