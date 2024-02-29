import {ColumnsType} from "antd/es/table";
import {Table} from "antd";

function FullTextSearchResult(props) {
    const columns = [
        {
            title: 'BookName',
            dataIndex : 'bookName',
            key : 'bookName'
        },
        {
            title: 'BookAuthor',
            dataIndex: 'bookAuthor',
            key : 'bookAuthor',
        },
        {
            title: 'BookInformation',
            dataIndex: 'bookInformation',
            key : 'bookInformation',
        }
    ]
    return (
      <div className="fulltext-result">
            <Table columns={columns} dataSource={props.bookList}/>
      </div>
    );
}

export default FullTextSearchResult;
