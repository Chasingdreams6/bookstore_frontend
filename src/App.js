import logo from './logo.svg';
import './App.css';
import "./css/base.css";
import {Alert, Button, message} from "antd";
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import BookView from "./view/bookview";
import LoginView from "./view/loginview";
import RegisterView from "./view/registerview";
import Bookdetailview from "./view/bookdetailview";
import BookDetailView from "./view/bookdetailview";
import ProfileView from "./view/profileview";
import {useEffect, useRef, useState} from "react";
import React from "react";
import BookManageView from "./view/bookmanageview";
import CartView from "./view/cartview";
import OrderView from "./view/orderview";
import Usermanageview from "./view/usermanageview";
import UserManageView from "./view/usermanageview";
import OrderManageView from "./view/ordermanageview";
import StatisticsView from "./view/statisticsview";
import AddBookView from "./view/addbookview";
import * as constant from "./utilities/constant";
import io from 'socket.io-client';
import FullTextSearchView from "./view/fullTextSearchView";

function App(){

    const ws = useRef(null);
    const [allBooks, setAllBooks] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [bookData, setBookData] = useState([]);
    const [profile, setProfile] = useState([]);
    const [openSearch, setOpenSearch] = useState(false);
    const [preSearchData, setPreSearchData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [flushCart, setFlushCart] = useState(false);
    const [users, setUsers] = useState([]);
    const [bookList, setBookList] = useState([]);
    //const navigate = useNavigate();

    // useEffect(
    //     ()=>{
    //
    //     },
    //     [changeFlushCart, ws]
    // );

    useEffect(
        () => {
            fetch(`${constant.BACKEND}/getBooks`, )   // getBooks
                .then((res) => {
                    if (res.ok) {
                        res.json().then(
                            (json)=> {
                                console.log(json.detail);
                                setBookData(Object.values(json.detail));
                                setAllBooks(Object.values(json.detail));
                            }
                        )
                    }
                    else {
                        console.log("Net error");
                    }
                })
                .catch((error)=>{console.log("Parse error" + error)});

            // const client = io(`${constant.WS}/order`, {
            //     transports: ['websocket'],
            // })
        }, []
    )

    function getWebSocketConnection(id) {
        console.log("try to get ws");
        ws.current = new WebSocket(`${constant.WS}/orderWs/${id}`);
        ws.current.onmessage = m => {
            console.log("ws get reply" + m.data);
            let data = JSON.parse(m.data);
            message.info(data.msg);
            changeFlushCart();
        }
    }

    function closeWsConnection() {
        console.log("try to close ws");
        ws.current?.close();
    }

    function setUsersWrapped(users) {
        setUsers(users);
    }
    function changeCartData(newData) {
        setCartData(newData);
    }
    function changeProfile(newProfile) {    //
        console.log(newProfile);
        setProfile(newProfile);
        sessionStorage.removeItem("user");
        sessionStorage["user"] = JSON.stringify(newProfile);    // store to local
    }

    function changeOrderData(newData) {
        setOrderData(newData);
    }
    function changeFlushCart() {
        setFlushCart(!flushCart);
    }
    function deleteBookByISBN(isbn) {
        console.log("delete", isbn);
        const dataSource = [...bookData];
        fetch(`${constant.BACKEND}/deleteBookByISBN?id=${isbn}`).then((res)=>{
            if (res.ok) {
                res.json().then((json)=>{
                    if (json.code === 200) {
                        message.info("Success to delete a book");
                        setBookData(dataSource.filter(
                            (item) => item.id !== isbn));
                    }
                    else message.info("Fail to delete");
                })
            }
        }).catch((error)=>{console.log(error)})
    }
    function deleteUserByName(name) {
        const dataS = [...users];
        fetch(`${constant.BACKEND}/user/deleteUserByName?id=${name}`).then((res)=>{
            if (res.ok) {
                res.json().then((json)=>{
                    if (json.code === 200) {
                        message.info("Success to delete a user");
                        setUsers(dataS.filter(
                            (item) => item.username !== name));
                    }
                    else message.info("Fail to delete");
                })
            }
        }).catch((error)=>{console.log(error)})
    }


    function handleSearch(key) {
        console.log("key", key);
        if (key === "") {
            setBookData(preSearchData);
            setOpenSearch(false);
        }
        else {
            let curUse = preSearchData;
            if (!openSearch) {
                curUse = bookData.slice();
                setPreSearchData(bookData);
            }
            let search = curUse.filter((one)=>{
                return (one["id"].indexOf(key) > -1) || (one["bookname"].indexOf(key) > -1);
            });
            setBookData(search);
            setOpenSearch(true);
        }
    }

    function handleFullTextSearch(key) {
        //console.log(key);
        if (key === "") key = "*:*";
        fetch(`${constant.BACKEND}/fulltextSearch?info=${key}`)
            .then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        console.log(json.detail);
                        setBookList(Object.values(json.detail));
                    })
                }
            }).catch((error)=>{
                console.log(error);
        })
    }

    function searchByClass(item, key) {
        console.log("class", item);
    }

    function toggleSearchPrice() {
        if (openSearch) { // 恢复
            console.log("restore");
            setBookData(preSearchData);
            setOpenSearch(false);
        }
    }

    function searchByPrice(item, key) {
        let maxPrice = 5000 * item.key, minPrice = 5000 * (item.key - 1);
        if (item.key === "4") maxPrice = 99824400;
        //console.log("price", maxPrice, this.state.openSearch);
        let curUse = preSearchData;
        if (!openSearch) {
            curUse = bookData.slice();
            setPreSearchData(bookData);
        }
        console.log("minmax", minPrice, maxPrice);
        console.log("init", curUse);
        let search = curUse.filter((one)=>{
            return (Number(one.bookprice) <= maxPrice)
                 && (Number(one.bookprice) > minPrice);
        });
        console.log(search);
        setBookData(search);
        setOpenSearch(true);
    }

    function changeBook(newBook) {
        console.log("newBook", newBook);
        const newData = bookData.slice();
        const index = newData.findIndex((Item)=>newBook.id === Item.id);
        const request = {
            "id": newBook.id,
            "bookname": newBook.bookname,
            "bookprice": newBook.bookprice,
            "bookauthor": newBook.bookauthor,
            "bookremain": newBook.bookremain
        }
        fetch(`${constant.BACKEND}/updateBook`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(request)
        }).then((res)=>{
            if (res.ok) {
                res.json().then((json)=>{
                    if (json.code === 200) {
                        message.info(json.msg);
                        const delData = newData[index];
                        newData.splice(index, 1, {...delData, ...newBook});
                        setBookData(newData);
                    }
                    else {
                        message.info(json.msg);
                    }
                })
            } else message.info("Oops! Net error!");
        }).catch((error)=>{console.log(error);})
    }

    function changeUser(newUser) {
        console.log("newUser", newUser);
        const newData = users.slice();
        const index = newData.findIndex((Item)=>newUser.id === Item.id);
        const request = {
            "userid": newUser.id,
            "username": newUser.username,
            "userpassword": newUser.userpassword,
            "usergender": newUser.usergender,
            "usermail": newUser.usermail,
            "userphone": newUser.userphone,
            "useraddress":newUser.useraddress,
            "uservalid":newUser.valid
        }
        fetch(`${constant.BACKEND}/user/updateUser`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(request)
        }).then((res)=>{
            if (res.ok) {
                res.json().then((json)=>{
                    if (json.code === 200) {
                        message.info(json.msg);
                        const delData = newData[index];
                        newData.splice(index, 1, {...delData, ...newUser});
                        setUsers(newData);
                    }
                    else {
                        message.info(json.msg);
                    }
                })
            } else message.info("Oops! Net error!");
        }).catch((error)=>{console.log(error);})
    }

    function buyOneBook(isbn, number) { //try to buy a book
        if (profile.id === null) message.info("Oops! Please login!");
        const request = {
            "isbn": isbn,
            "userid": profile.id,
            "number": number
        };
        fetch(`${constant.BACKEND}/buyBook`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(request)
        });

    }

    function buyAll() { // try to buy all books
        if (cartData.length < 1) {
            message.info("Oops! No goods in your cart!");
            return ;
        }
        const request = {
            "userid": profile.id,
        };
        fetch(`${constant.BACKEND}/buyBooks`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(request)
        }).then((res)=>{
            if (res.ok) {
                res.json().then((json)=>{
                    message.info(json.msg);
                    changeFlushCart();  // do aync flush
                })
            }
            else message.info("Oops! Network Error!");
        }).catch((error)=>{console.log(error);})
    }

    function cancelItem(isbn) { // delete a book from cart
        const request = {
            "isbn": isbn,
            "userid": profile.id,
        };
        fetch(`${constant.BACKEND}/cancelItem`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(request)
        }).then((res)=>{
            if (res.ok) {
                res.json().then((json)=>{
                    console.log(json.msg);
                    changeFlushCart();  // do aync flush
                })
            }
            else message.info("Oops! Network Error!");
        }).catch((error)=>{console.log(error);})
    }

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<BookView
                    handleSearch={handleSearch}
                    bookData={bookData}
                    searchByClass={searchByClass}
                    searchByPrice={searchByPrice}
                    toggleSearchPrice={toggleSearchPrice}
                    profile={profile}
                    closeWsConnection={closeWsConnection}
                />}
                />
                <Route exact path="/login" element={<LoginView
                    changeProfile={changeProfile}
                    profile={profile}
                    closeWsConnection={closeWsConnection}
                    changeCartData={changeCartData}
                    getWebSocketConnection={getWebSocketConnection}
                />}/>

                <Route exact path="/register" element={<RegisterView changeProfile={changeProfile}/>}/>
                <Route exact path='/bookdetail/:id' element={<BookDetailView profile={profile} closeWsConnection={closeWsConnection}/>}/>}/>
                <Route exact path='/profile' element={<ProfileView
                    profile={profile} closeWsConnection={closeWsConnection} changeProfile={changeProfile}
                />}/>

                <Route exact path='/fullTextSearch' element={<FullTextSearchView
                    profile={profile}
                    closeWsConnection={closeWsConnection}
                    handleFullTextSearch={handleFullTextSearch}
                    bookList={bookList}
                />}

                />

                <Route exact path="/bookmanage" element={<BookManageView
                    bookData={bookData}
                    deleteBookByISBN={deleteBookByISBN}
                    changeBook={changeBook}
                    handleSearch={handleSearch}
                    closeWsConnection={closeWsConnection}
                    profile={profile}
                />}
                />

                <Route exact path="/usermanage" element={<UserManageView
                    users={users}
                    deleteUserByName={deleteUserByName}
                    changeUser={changeUser}
                    setUsers={setUsersWrapped}
                    profile={profile}
                    closeWsConnection={closeWsConnection}
                />}
                />

                <Route exact path="/ordermanage" element={<OrderManageView
                    users={users}
                    setUsers={setUsersWrapped}
                    profile={profile}
                    closeWsConnection={closeWsConnection}
                />}

                />

                <Route exact path='/cart' element={<CartView
                    cartData={cartData}
                    bookData={allBooks}
                    profile={profile}
                    closeWsConnection={closeWsConnection}
                    changeCartData={changeCartData}
                    buyOneBook={buyOneBook}
                    buyAll={buyAll}
                    cancelItem={cancelItem}
                    flushCart={flushCart}
                />}/>

                <Route exact path='/order' element={<OrderView
                    orderData={orderData}
                    changeOrderData={changeOrderData}
                    bookData={allBooks}
                    profile={profile}
                    closeWsConnection={closeWsConnection}
                />}/>

                <Route exact path="/statistics" element={<StatisticsView profile={profile} closeWsConnection={closeWsConnection}/>}/>

                <Route exact path="/addbook" element={<AddBookView/>}/>
            </Routes>
        </Router>
    );

}

export default App;
