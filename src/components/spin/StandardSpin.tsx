import React, { ReactNode } from 'react'
import { themes, ThemeType } from '../../theme'
import { Spin } from 'antd'

type Props = {
    spinning: boolean
    children: ReactNode
    theme: ThemeType
}

export default function StandardSpin(props: Props) {
    return (
        <Spin spinning={props.spinning} tip="Loading..." style={{ color: props.theme === 'dark' ? themes[props.theme].textColor : themes[props.theme].primaryColor }}>
            {props.children}
        </Spin>
    )
}
