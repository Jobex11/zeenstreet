// Shared Task Properties
interface BaseTask {
    title: string;
    shares: number;
    image: string;
    _id: string;
    countdown: number;
    baseReward: number;
    timeRemaining: number;
}

// Extending BaseTask for Specific Scenarios
interface PartnerTask extends BaseTask {
    chat_id: string;
    url: string;
    type: string;
}

interface RefTask extends BaseTask {
    refCount: number;
}

interface EventTask extends BaseTask {
    url: string;
    type: string;
}

interface SocialTask extends BaseTask {
    socialUrl: string;
    chat_id: string;
}

// Common Props
interface CommonProps {
    refetch?: () => void;
    telegram_id?: string | null;
}

// Specific Props for Each Case
export interface PartnersProps extends CommonProps {
    tasks: PartnerTask;
    special: string;
}

export interface RefProps extends CommonProps {
    tasks: RefTask;
    type: string;
}

export interface EventsProps extends CommonProps {
    tasks: EventTask;
    special: string;
}

export interface SocialTasksProps extends CommonProps {
    tasks: SocialTask;
    type?: string;
}
