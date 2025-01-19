import React, { useRef, useState , useEffect} from 'react'
import DeleteModal from '../components/deleteModal';
import UpdateBlog from '../components/UpdateBlog';
import userimage from '../assets/user.png'
import axios from 'axios'


const Dashboard = () => {
  

  const title = useRef()
  const content = useRef()
  const text = useRef()


  const [loader , setLoader] = useState (false)
  const [mainLoader , setMainLoader] = useState(true)
  const [blogArray , setBlogArray] = useState ([])
  const [userObj , setUserObj] = useState({})
  const [delModal , setDelModal] = useState(false)
  const [dbdocid , setDBdocid] = useState (null)
  const [deleteIndex , setDeletIndex] = useState(null)
  const [updateModal , setUpdateModal] = useState (false)
  const [updateIndex , setUpdateIndex] = useState(null)
  const [like , setLike] = useState(0)
  const [commentValue , setCommentValue] = useState('')

  useEffect(() => {
      
      const allPostFunction = async () => {
        try {
          const accessToken = localStorage.getItem('accessToken')
          const Allposts = await axios.get ('https://blogging-app-backend-sandy.vercel.app/api/v1/post' , {
              headers: {
              'Authorization': accessToken, 
              'Content-Type': 'application/json'
              },
          })
          console.log (Allposts)
          setBlogArray([...Allposts.data.getAllPosts])
          setMainLoader(false)          
        } catch (error) {
          console.log (error)
        }
      }

      allPostFunction()
  } , [])


  const addComment = async (id ,commentValue) => {

    try {
      const accessToken = localStorage.getItem('accessToken');
      const commentCreated = await axios.post('https://blogging-app-backend-sandy.vercel.app/api/v1/comment', { postID: id , text: commentValue }, {
        headers: {
          'Authorization': accessToken,
          'Content-Type': 'application/json',
        },
      });

      console.log (commentCreated)

      const Allposts = await axios.get ('https://blogging-app-backend-sandy.vercel.app/api/v1/post' , {
              headers: {
              'Authorization': accessToken, 
              'Content-Type': 'application/json'
              },
          })
          setBlogArray([...Allposts.data.getAllPosts])
    } catch (error) {
      console.error('Error in commenting the post:', error);
    }


  }

  const likePost = async (id) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
  
      // Liking the post
      const likePostResponse = await axios.post('https://blogging-app-backend-sandy.vercel.app/api/v1/like', { postID: id }, {
        headers: {
          'Authorization': accessToken,
          'Content-Type': 'application/json',
        },
      });
  
          const Allposts = await axios.get ('https://blogging-app-backend-sandy.vercel.app/api/v1/post' , {
              headers: {
              'Authorization': accessToken, 
              'Content-Type': 'application/json'
              },
          })
          console.log (Allposts)
          setBlogArray([...Allposts.data.getAllPosts])
    } catch (error) {
      console.error('Error in liking the post:', error);
    }
  };
  


  const addBlog = async (event) => {
      
    event.preventDefault()
    setLoader(true)

      try {
        
        const accessToken = localStorage.getItem('accessToken');
    
        const addPost = await axios.post('https://blogging-app-backend-sandy.vercel.app/api/v1/post', { title: title.current.value , content: content.current.value }, {
          headers: {
            'Authorization': accessToken,
            'Content-Type': 'application/json',
          },
        });
      
        console.log (addPost)
        const Allposts = await axios.get ('https://blogging-app-backend-sandy.vercel.app/api/v1/post' , {
          headers: {
          'Authorization': accessToken, 
          'Content-Type': 'application/json'
          },
      })
      console.log (Allposts)
      setBlogArray([...Allposts.data.getAllPosts])


      } catch (error) {
        console.log (error)
      } finally{
        setLoader(false)
      }
    






  }

  return (
    <>
    <h1 className='text-2xl text-center m-4 text-start ms-[8%] font-bold'>Dashboard</h1>
    <div className='flex flex-col justify-center items-start bg-[#f8f9fa] py-[35px] ps-[15px] min-[400px]:ps-[50px] min-[600px]:ps-[112px]'>

      <div className='flex flex-col gap-5 justify-center items-start px-5 min-[450px]:px-[65px] py-7 bg-[#ffffff] w-[95%] min-[400px]:w-[85%] min-[900px]:w-[70%] min-w-[300px] min-h-[40vh] rounded-lg shadow-lg'>
          <form onSubmit={addBlog} className='flex w-full flex-col justify-center items-start gap-4'>
            <input type="text" placeholder="Title" className="w-full input input-bordered focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa]" required ref={title}/>
            <textarea className="textarea textarea-bordered w-full focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa]" placeholder="What is in your mind" maxLength={3000} ref={content} required></textarea>
            <button type='submit' className="bg-[#7749f8] text-white rounded-lg py-2 px-6">{loader ? <span className="loading loading-spinner loading-md"></span> : 'Publish Blog'}</button>
          </form>
      </div>

        <h1 className='text-2xl text-start font-bold mt-10 mb-6'>My blogs</h1>

      <div className='flex flex-col gap-5 justify-start items-start w-[80%] min-[400px]:w-[85%] min-[900px]:w-[70%]'>
        {mainLoader ? <div className='text-center w-full mt-5'><span className="loading loading-spinner loading-lg text-[#7749f8]"></span></div>: blogArray.length > 0 ? blogArray.map ((items , index)=> {
          return <div key={items._id} className='flex w-[100%] px-7 py-5 flex-col bg-[#ffffff] justify-center items-start gap-4 rounded-lg shadow-lg  min-h-[40vh] min-w-[300px]'>
            <div className='flex justify-start items-start gap-4 w-full pe-5'>
              <div className='text-white bg-[#7749f8] w-[70px] rounded-lg flex justify-center items-center'>
                <img src={userimage} alt="logo" className='w-100'/>
              </div>
              <div className='flex flex-col justify-start items-start w-[80%]'>
                <p className='font-bold text-2xl w-full break-words'>{items.title}</p>
                <p className='text-1xl w-full break-words'>Posted by: {items.user.username}</p>
              </div>
            </div>
            <div className='break-words w-full'>
              <p className='break-words text-[#7f868d]'>{items.content}</p>
            </div>
            <div className='flex justify-start gap-1'>
              <button onClick={()=> likePost(items._id)} className='hover:bg-[#dadcde] text-[#7749f8] rounded-lg px-3 py-1'>Likes ({items.likes.length === 0 ? '0' : items.likes.length})</button>
              <button onClick={()=> openDeleteModal(items.docid , index)} className='hover:bg-[#dadcde] text-[#7749f8] rounded-lg px-3 py-1'>Comments ({items.comments.length === 0 ? '0' : items.comments.length}) </button>
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <input onChange={(e)=> setCommentValue (e.target.value)} type="text" placeholder="comment here...." className="w-full input input-bordered focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa]" required ref={text}/>
              <button onClick={() => addComment (items._id , commentValue)} className="bg-[#7749f8] w-full text-white rounded-lg py-2 px-6">add comment</button>
            </div>
            <p>All comments here:</p>
            {items.comments.map((itemxx , index) => {
              return <div key={items._id} className='text-gray-500 p-2 border shadow-md rounded-lg w-full'>
                <p>comment by {itemxx.user.username}</p>
                <p className='text-[#7749f8]'>{itemxx.text}</p>
              </div>
            })
            }
          </div>}) : <div className='flex w-[100%] px-7 py-5 flex-col bg-[#ffffff] justify-center items-start gap-4 rounded-lg shadow-lg  min-h-[40vh] min-w-[300px]'>
            <h1 className='text-2xl text-[#7749f8] m-4 text-start ms-[8%] font-bold'>Post your blogs right now !!</h1>
        </div>
          }
      </div>
    </div>
    {delModal ? <DeleteModal 
      onConfirm = {deleteBlog} 
      onCancel = {cancelDelete}
      itemid = {dbdocid} 
      index = {deleteIndex}
    /> : null}
    {updateModal ? <UpdateBlog 
      onUpdate = {updateValues}
      upDateCancel = {cancelUpdate}
      itemid = {dbdocid}
      index = {deleteIndex}

    /> : null}
    </>
    
  )
}

export default Dashboard
