import {useState} from 'react';
import { Layout,Image } from 'antd';
import {Outlet} from 'react-router-dom'
import styles from './BaseLayout.module.css'
import HeaderContent from "@/components/HeaderContent.jsx";
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;
import SideMenu from '@/components/SideMenu.jsx'
function BaseLayout() {
    const [collapsed,setCollapsed] = useState(false)
    return (
            <Layout className={styles.baseLayout}>
                <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} theme='light' className={styles.siderContainer}>
                    <div className={styles.logoContainer}>
                        <Image
                            className={styles.imgLogo}
                            alt="basic"
                            preview={false}
                            src="../../../public/logo.png"
                        />
                        {!collapsed &&
                        <span className={styles.subName}>coderStation</span>
                        }
                    </div>
                    <SideMenu collapsed={collapsed}/>
                </Sider>
                <Layout>
                    <Header className={styles.headerContainer}>
                        <HeaderContent/>
                    </Header>
                    <Content className={styles.contentContainer}>
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
    );
}

export default BaseLayout;
