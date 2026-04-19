import {useRef, useState} from 'react';
import styles from './NewBooks.module.css';
import BookForm from './components/BookForm.jsx'
function NewBooks() {

    return (
        <div className={styles.container}>
            <div className={styles.title}>新增书籍</div>

            <div className='pt-2 pb-2 w-1/2'>
               <BookForm type='add'/>
            </div>
        </div>

    );
}

export default NewBooks;
