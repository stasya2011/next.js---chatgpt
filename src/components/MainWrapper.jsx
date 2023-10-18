import {Layout, Form, Button, Input} from 'antd';
import Link from "next/link";





const MainWrapper = ({children}) => {
    const {Header} = Layout;
    return (
        <Layout style={{width: 800, margin: "0 auto"}}>
            <Header style={{marginBottom: 20}}>
                <Link style={{marginRight: 20, color: "white"}} href={"/about"}>About</Link>
                <Link style={{marginRight: 20, color: "white"}} href={"/game"}>Game</Link>
                <Link style={{marginRight: 20, color: "white"}} href={"/"}>Chat</Link>
            </Header>
            {children}
        </Layout>
    );
};

export default MainWrapper;
