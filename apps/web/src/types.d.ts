declare interface DefaultProps {
    children?: React.ReactNode[] | React.ReactNode
}

declare type ActionState = {
    status: 'none' | 'success'
    error?: undefined
} | {
    status: 'failed'
    error: string
}
