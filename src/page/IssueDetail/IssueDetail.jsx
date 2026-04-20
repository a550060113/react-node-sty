import {useEffect, useRef, useState} from 'react';
import issue from "@/server/issue.js";
import {useSearchParams} from "react-router-dom";
import '@toast-ui/editor/dist/toastui-editor.css';
function IssueDetail(props) {
    const [searchParams] = useSearchParams()
    const [issueDetails, setIssueDetails] = useState(null);
    useEffect(() => {
        let id = searchParams.get('id')
        console.log('id',id)
        if (id){
         issue.getIssueById(id).then(({data})=>{
             setIssueDetails(data)
         })

        }
    }, []);
    return (
        <div className='p-4'>
            <div className='font-bold text-xl pb-4'>问答详情</div>
            <div >
                {issueDetails?.issueTitle}
            </div>
        </div>
    );
}

export default IssueDetail;
