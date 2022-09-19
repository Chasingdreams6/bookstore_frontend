import React, {useContext, useEffect, useRef, useState} from "react";

import "../css/usermanage.css";
import {Button, Form, Input, Popconfirm, Table} from "antd";
import Title from "antd/es/typography/Title";
import * as constant from "../utilities/constant";

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values }); // TODO
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

function UserManage(props){

    useEffect(
        ()=>{
            fetch(`${constant.BACKEND}/user/getUsers`).then(
                (res)=>{
                    if (res.ok) {
                        res.json().then((json)=>{
                            if (json.code === 200) {
                                console.log(json.detail);
                                props.setUsers(Object.values(json.detail));
                            }
                        })
                    }
                }
            )
        },[]
    )
    const columnsp = [
        {
            title: 'id',
            dataIndex: 'id',
        },
        {
            title : 'username',
            dataIndex : 'username',
            width : '10%',
            editable: true,
        },
        {
            title: 'password',
            dataIndex: 'userpassword',
            editable: true,
        },
        {
            title: 'gender',
            dataIndex: 'usergender',
            editable: true,
        },
        {
            title: 'mail',
            dataIndex: 'usermail',
            editable: true,
        },
        {
            title: 'address',
            dataIndex: 'useraddress',
            editable: true,
        },
        {
            title: 'phone',
            dataIndex: 'userphone',
            editable: true,
        },// TODO
        {
            title: 'valid',
            dataIndex: 'valid',
            editable: true,
        },
        {
            title: 'delete',
            dataIndex: 'delete',
            render : (_, record) => props.users.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={()=>props.deleteUserByName(record.username)}>
                    <a>Delete</a>
                </Popconfirm>) : null,
        }
    ];
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = columnsp.map((col,key) => {
        if (!col.editable) return col;
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: props.changeUser
            }),
        };
    });

    return (
        <div className="user-manage-block">
            <Title level={5}>
                Manage All Users
            </Title>
            {/*<Button*/}
            {/*    onClick={props.addUser}*/}
            {/*    type="primary"*/}
            {/*    className="user-manage-add-button"*/}
            {/*>*/}
            {/*    Add a New User*/}
            {/*</Button>*/}
            <Table
                components={components}
                rowClassName={()=>'editable-row'}
                bordered
                dataSource={props.users}
                columns={columns}
                rowKey="id"
            />
        </div>
    );
}

export default UserManage;
