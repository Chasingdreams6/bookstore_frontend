import React, {useContext, useEffect, useRef, useState} from "react";

import "../css/bookmanage.css";
import {Button, Form, Input, Popconfirm, Table} from "antd";
import Title from "antd/es/typography/Title";
import {useNavigate} from "react-router-dom";

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

function BookManage(props){

    const columnsp = [
        {
            title : 'bookname',
            dataIndex : 'bookname',
            width : '10%',
            editable: true,
        },
        {
            title: 'id',
            dataIndex: 'id',
        },
        {
            title: 'bookauthor',
            dataIndex: 'bookauthor',
            editable: true,
        },
        {
            title: 'bookprice(*100)',
            dataIndex: 'bookprice',
            editable: true,
        },
        {
            title: 'bookremain',
            dataIndex: 'bookremain',
            editable: true,
        },

        {
            title: 'delete',
            dataIndex: 'delete',
            render : (_, record) => props.bookData.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={()=>props.deleteBookByISBN(record.id)}>
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
                handleSave: props.changeBook
            }),
        };
    });
    const navigate = useNavigate();
    function addBook() {
        navigate("/addbook");
    }
    return (
        <div className="book-manage-block">
            <Title level={5}>
                Manage All Books
            </Title>
            <Button
                onClick={addBook}
                type="primary"
                className="book-manage-add-button"
                >
                Add a New Book
            </Button>
            <Table
                components={components}
                rowClassName={()=>'editable-row'}
                bordered
                dataSource={props.bookData}
                columns={columns}
                rowKey="id"
            />
        </div>
    );
}

export default BookManage;
