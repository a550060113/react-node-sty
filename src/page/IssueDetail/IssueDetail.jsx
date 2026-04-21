import {useEffect, useRef, useState} from 'react';
import issue from "@/server/issue.js";
import {useSearchParams} from "react-router-dom";
import '@toast-ui/editor/dist/toastui-editor.css';
import DetailsItem from "./components/DetailsItem.jsx";
import {useSelector} from "react-redux";

function IssueDetail(props) {
    const [searchParams] = useSearchParams()
    const [issueDetails, setIssueDetails] = useState(null);
    const {typesList}  = useSelector(state => state.types);
    let typeName = null
    if(typesList.length > 0){
        let obj = typesList.find(item=>item._id == issueDetails?.typeId)
        console.log('obj',obj)
        typeName = obj?.typeName
        console.log('typeName',typeName)
    }
    useEffect(() => {
        console.log('typesList',typesList)
        let id = searchParams.get('id')
        console.log('id',id)
        if (id){
         issue.getIssueById(id).then(({data})=>{
             console.log(data)
             setIssueDetails(data)
         })

        }
    }, []);
    return (
        <div className='p-4'>
            <div className='font-bold text-xl pb-4'>问答详情</div>
            <div>
                <DetailsItem label={'书籍名称'} content={issueDetails?.issueTitle} />
                <DetailsItem label={'问答描述'} content={issueDetails?.issueContent} />
                <DetailsItem label={'书籍名称'} content={issueDetails?.issueTitle} />
                <DetailsItem label={'浏览数'} content={issueDetails?.scanNumber} />
                <DetailsItem label={'评论数'} content={issueDetails?.commentNumber} />
                <DetailsItem label={'书籍分类'} content={typeName} />
            </div>
        </div>
    );
}

export default IssueDetail;
