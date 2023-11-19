import { Watermark } from 'antd'
import React from 'react'

const ErrorElement: React.FC = () => (
  <Watermark font={{ fontSize: 30 }} content="Error: No such page">
    <div style={{ height: 'calc(100vh - 6em)', minHeight: '17em' }} />
  </Watermark>
)

export default ErrorElement
