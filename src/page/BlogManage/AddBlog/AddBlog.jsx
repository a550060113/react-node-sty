import React from 'react';
import styles from './NewBlog.module.css'
import BlogForm from "@/page/BlogManage/components/BlogForm.jsx";
function AddBlog() {
    return (
        <div className={styles.container}>
            <div className={styles.title}>添加博客</div>
            <div className={styles.tableContainer}>
                <BlogForm/>
            </div>
        </div>
    );
}

export default AddBlog;
