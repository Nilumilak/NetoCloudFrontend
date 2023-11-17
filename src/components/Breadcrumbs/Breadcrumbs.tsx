import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';

type BreadcrumbsProps = {
  currentPath: string
  onPathChange: (path: string) => void
}

function Breadcrumbs({ currentPath, onPathChange }: BreadcrumbsProps) {
  const pathList = currentPath.split("/")

  return (
    <Breadcrumb
      items={[
        {
          title: <HomeOutlined onClick={() => onPathChange("")} />,
        },
        ...pathList.map((path, index) => ({
          title: <a onClick={() => onPathChange(pathList.splice(0, index + 1).join("/") + "/")}>{path}</a>
        }))
      ]}
    />
  )
}

export default Breadcrumbs
