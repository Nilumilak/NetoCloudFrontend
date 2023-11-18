import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'

type BreadcrumbsProps = {
  currentPath: string
  onPathChange: (path: string) => void
}

function Breadcrumbs ({ currentPath, onPathChange }: BreadcrumbsProps): JSX.Element {
  const pathList = currentPath.split('/')

  return (
    <Breadcrumb
      items={[
        {
          title: <HomeOutlined onClick={() => { onPathChange('') }} />
        },
        ...pathList.map((path, index) => ({
          title: <a onClick={() => { onPathChange(pathList.splice(0, index + 1).join('/') + '/') }}>{path}</a>
        }))
      ]}
    />
  )
}

export default Breadcrumbs
