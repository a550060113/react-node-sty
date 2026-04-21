import React from 'react';

function DetailsItem({label,content}) {
    return (
        <div className='flex justify-items-center'>
            <div className='font-light text-base'>{label}：</div>
            {label == '问答描述' ? (
                <div dangerouslySetInnerHTML={{__html:content}}></div>
                ) :
                <div className='ml-2 text-base'>{content}</div>
            }
        </div>
    );
}

export default DetailsItem;
