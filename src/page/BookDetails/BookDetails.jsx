import {useEffect, useState} from 'react';
import {useNavigate,useSearchParams} from "react-router-dom";
import BookForm from "@/page/NewBooks/components/BookForm.jsx";
import book from '@/server/book.js'
import {message} from "antd";
function BookDetails(props) {
    const [bookInfo, setBookInfo] = useState(null)
    const [searchParams] = useSearchParams()
    const editBook = async (newInfo) =>{
        let data = await book.editBook(bookInfo._id,{...bookInfo,...newInfo})
        if(data.code == 0){
            message.success('编辑成功')
        }
    }

    useEffect(() => {
        async function fetchBookInfo(){
            let {data} = await book.getBookById(searchParams.get('id'))
            // console.log(data)
            setBookInfo(data)
        }
        if(searchParams.get('id')){
            fetchBookInfo()
        }
    }, []);
    return (
        <div className='p-4 font-'>
            <div className='text-lg m-4 font-bold w-1/2'>书籍编辑</div>
            <div  className='pt-2 pb-2 w-1/2'>
                <BookForm bookInfo={bookInfo} editBook={editBook} type={'edit'}/>
            </div>
        </div>
    );
}

export default BookDetails;
