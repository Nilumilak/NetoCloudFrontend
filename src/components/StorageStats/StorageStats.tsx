import { Flex, Statistic } from 'antd'

type StorageStatsProps = {
  filesCount: number
  filesSize: number
  maxSize: number
}

const sizeConverter = (size: number): string => {
  if (Math.floor(size / 1000000000) > 0) {
    return `${Math.floor(size / 1000000000)}GB`
  } else if (Math.floor(size / 1000000) > 0) {
    return `${Math.floor(size / 1000000)}MB`
  } else if (Math.floor(size / 1000) > 0) {
    return `${Math.floor(size / 1000)}KB`
  } else {
    return '0KB'
  }
}

function StorageStats ({ filesCount, filesSize, maxSize }: StorageStatsProps): JSX.Element {
  return (
        <Flex style={{ justifyContent: 'space-between' }}>
            <Statistic title="Files count" value={filesCount} />
            <Statistic title="Total Space" value={sizeConverter(filesSize)} suffix={`/ ${sizeConverter(maxSize)}`} />
        </Flex>
  )
}

export { sizeConverter }
export default StorageStats
