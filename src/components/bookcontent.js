import React, {useEffect, useState} from "react";
import {Content, Footer} from "antd/es/layout/layout";
import {Breadcrumb, Card, Col, Layout, Menu, Pagination, Row, Space, Typography} from "antd";
import Sider from "antd/es/layout/Sider";

import "../css/bookview.css"
import Paragraph from "antd/es/typography/Paragraph";
import {Link} from "react-router-dom";

const {SubMenu} = Menu;
const {Meta} = Card;

function BookContent(props){
    const BOOKROWS = 2;
    const BOOKPERLINE = 4;
    const BOOKPERPAGE = BOOKPERLINE * BOOKROWS;
    //const [bookNumbers, setBookNumbers] = useState(0);
    const [p, setP] = useState(1);
   // const [allBooks, setAllBooks] = useState({});

    function changeP(pageNumber) {
        setP(pageNumber);
    }
    function renderBooks() {
        let books = props.bookData.slice((p - 1) * BOOKPERPAGE, p * BOOKPERPAGE); // 取出
        //console.log(books);
        let wrappedBooks = [];
        // eslint-disable-next-line array-callback-return
        books.map((item, index)=>{
            let id = index + (p - 1) * BOOKPERPAGE;
            let url = `/bookdetail/${item.id}`;
            let price = item.bookprice / 100.0;
            let content = (
                <div key={index}>
                    <Link to = {url} >
                       <Card
                           hoverable
                           className="bv-book"
                           cover={<img
                               alt={item.bookname}
                               //src={require(item.bookGraphUri)}
                               src={item.bookgraphuri}
                               className="bv-book-graph"
                           />
                               }
                       >
                           <Meta title={item.bookname} description={item.bookauthor}/>
                           <Meta description={price}/>
                       </Card>
                    </Link>
                </div>
            );
            wrappedBooks.push(content);
        })
        let res = (
          <Space size={[20, 30]} wrap={true}>
              {wrappedBooks}
          </Space>
        );
        return res;
    }
    function renderPagination() {
        //console.log(this.props.bookData.length);
        let res = (
            <Pagination
                className="bv-pagination"
                showQuickJumper
                defaultCurrent={1}
                total={props.bookData.length}
                defaultPageSize={BOOKPERPAGE}
                onChange={changeP}/>
        );
        return res;
    }
    return(
      <Content style={{padding: '0 50px'}}>
          <Layout className="bv-content" >
              <Sider className="bv-sidebar">
                  {/*<Menu*/}
                  {/*  mode="inline"*/}
                  {/*  style={{height:'50%'}}*/}
                  {/*  onClick={props.searchByClass}*/}
                  {/*>*/}
                  {/*    <SubMenu key="sub1" title={"Class"}>*/}
                  {/*        <Menu.Item key="1">Politics</Menu.Item>*/}
                  {/*        <Menu.Item key="2">Military</Menu.Item>*/}
                  {/*        <Menu.Item key="3">Economics</Menu.Item>*/}
                  {/*        <Menu.Item key="4">Education</Menu.Item>*/}
                  {/*    </SubMenu>*/}
                  {/*</Menu>*/}

                  <Menu
                      mode="inline"
                      style={{height:'50%'}}
                      onClick={props.searchByPrice}
                      onOpenChange={props.toggleSearchPrice}
                  >
                      <SubMenu key="sub2" title={"Price"}>
                          <Menu.Item key="1">￥0~50</Menu.Item>
                          <Menu.Item key="2">￥50~100</Menu.Item>
                          <Menu.Item key="3">￥100~150</Menu.Item>
                          <Menu.Item key="4">￥150~</Menu.Item>
                      </SubMenu>
                  </Menu>
              </Sider>

              <Content className="bv-books">
                  <Typography>
                      <Paragraph>Books</Paragraph>
                  </Typography>
                  {renderBooks()}
                  {renderPagination()}
              </Content>
          </Layout>
      </Content>
    );
}

export default BookContent;
