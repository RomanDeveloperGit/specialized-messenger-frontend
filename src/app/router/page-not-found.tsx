import { Alert } from 'antd';

export const PageNotFound = () => {
  return <Alert title="Страница не найдена" description={'404'} type="error" showIcon={true} />;
};
