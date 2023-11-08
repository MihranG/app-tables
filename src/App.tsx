import {Layout} from 'antd'
import AppsTable from "./components/AppsTable.tsx";

const {Content} = Layout;

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#108ee9',
    display: "flex",
    justifyContent: 'center'
};
function App() {

  return (
    <Layout>
      <Content style={contentStyle}>
            <AppsTable />
      </Content>
    </Layout>
  )
}

export default App
