import React, { useEffect, useState } from 'react'
import { deletePost, getPost } from '../api/Postapi'
import "../App.css"
import Form from './Form'

const Posts = () => {
    const [data, setData] = useState([])
    const [updateDataApi, setUpdateDataApi] = useState({})

    const getapiData = async () => {
        const res = await getPost()
        setData(res.data)
        console.log(res.data)
    }
    useEffect(() => {
        getapiData()
    }, [])

    // function delete post

    const handleDeletePost = async (id) => {
        try {
            const res = await deletePost(id)
            if (res.status === 200) {
                const newUpdatedData = data.filter((curPost) => {
                    return curPost.id != id
                })
                setData(newUpdatedData)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdatePost = (curElem) => { setUpdateDataApi(curElem) }

    return (
        <>
            <section className='section-form'>
                <Form
                    data={data}
                    setData={setData}
                    updateDataApi={updateDataApi}
                    setUpdateDataApi={setUpdateDataApi} />
            </section>

            <section className='section-post'>
                <ol>
                    {
                        data.map((curElem) => {
                            const { id, title, body } = curElem
                            return (
                                <li key={id}>
                                    <p>Title : {title}</p>
                                    <p>Body : {body}</p>
                                    <button onClick={() => handleUpdatePost(curElem)}>Edit</button>
                                    <button className='btn-delete' onClick={() => handleDeletePost(id)}>Delete</button>
                                </li>
                            )
                        })
                    }
                </ol>
            </section>
        </>
    )
}

export default Posts