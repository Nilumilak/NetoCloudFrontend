import { Flex, Popover, Button } from 'antd';
import { useState } from 'react'

type PopoverProps = {
    children: JSX.Element
    message: string
    onConfirmHandler: () => void
}

function PopoverWrapper({ children, message, onConfirmHandler }: PopoverProps): JSX.Element {
    const [state, setState] = useState(false)

    return (
        <Popover
            content={
                <Flex style={{ gap: "1em", justifyContent: "flex-end" }}>
                    <Button key="confirmNo" onClick={() => setState(false)} >
                        No
                    </Button>
                    <Button key="confirmYes" type='primary' onClick={() => {
                        setState(false)
                        setTimeout(() => {
                            onConfirmHandler()
                        }, 500)
                    }} danger>
                        Yes
                    </Button>
                </Flex>
            }
            title={message}
            trigger="click"
            open={state}
            onOpenChange={setState}
        >
            <div onClick={() => setState(true)}>{children}</div>
        </Popover>
    )
}

export default PopoverWrapper
