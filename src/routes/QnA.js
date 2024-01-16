import React,{useEffect, useState} from 'react';
import { db } from '../firebase';
import { onSnapshot, query, orderBy, collection,  addDoc, serverTimestamp,where  } from "firebase/firestore"; 
import Post from '../components/Post';
import { getStorage, ref, uploadString, getDownloadURL} from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

let QnaBox = styled.section ` 
 
`

const QnA = (userObj)=> {

    const [post, setPost] = useState(''); //입력된 포스트 내용
    const [posts, setPosts] = useState([]); //모든 포스트 목록
    const [attachment, setAttachment] = useState();//img Url
    let attachmentUrl = '';
 


    // const navigate = useNavigate();
    // console.log(userObj)
  

    const onChange = (e) => {
      // const val = e.target.value;
      const {target:{value}} = e; //ES6
      setPost(value);
    }
    
    const onSubmit = async (e) => {
      e.preventDefault();
      const storage = getStorage();
      const storageFileRef = ref(storage, `${userObj.userObj}/${uuidv4()}`);

      const makePost = async (url) =>{
        try{
          await addDoc(collection(db, "posts"), {
            content: post,
            date: serverTimestamp(),
            uid:userObj.userObj.uid,
            attachmentUrl:url,
            postUid: userObj.userObj.uid
          });       
          attachmentUrl = '';
          
        } catch(e){
            console.log(e);
        }
      }

      if(attachment){      
        uploadString(storageFileRef, attachment, 'data_url').then(async (snapshot) => {     
          attachmentUrl =await getDownloadURL(storageFileRef);
          makePost(attachmentUrl);
        });
      } else{
        makePost(attachmentUrl);
      }

    }

    useEffect(()=> {
      // getPosts();
      const q = query(
        collection(db, "posts"), 
        orderBy("date"),
        where("uid", "==", userObj.userObj?.uid || ''),
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const postArr = [];
        querySnapshot.forEach((doc) => {
          postArr.push({
            id: doc.id,
            ...doc.data(),
            postUid: userObj.userObj.uid
           
          });
        });
        setPosts(postArr);
      });
      
  
      // Cleanup function to unsubscribe from the snapshot listener when the component unmounts
      return () => unsubscribe();
    }, [userObj]); // userObj가 변경될 때마다 useEffect가 재실행
  


    const onFileChange = (e) => {
      //console.log(e.target.files[0]);
      const {target:{files}} = e;
      const theFile = files[0];

      const imgReader = new FileReader();
      imgReader.onload = (e) => {
        setAttachment(e.target.result);
      }

      imgReader.readAsDataURL(theFile);
    }
    const onFileClear = () => {
      setAttachment(null);
      document.querySelector("#attachment").value=null;
    }

    return (
      <QnaBox>
        <div className='container'>
          <h2>프로필</h2>
          <p>이름: {userObj.userObj.displayName}</p>
          <p>이메일: {userObj.userObj.email}</p>
          <form onSubmit={onSubmit}>
            <p>
              <label htmlFor="content">내용:</label>
              <input type='text' id='content' name='posts' value={post}
              placeholder='포스터 쓰기' 
              onChange={onChange}/>
            </p>
            <p>
              <label htmlFor="attachment">첨부이미지:</label>
              <input type='file' onChange={onFileChange} id="attachment" accept='images/*'/>
            </p>
            {attachment && 
              <div>
                <img src={attachment} alt='' width="50" height="50"/>
                <button type='button' onClick={onFileClear}>이미지 등록 취소</button>
              </div>
            }
            <input type='submit' value='입력'/>
          </form>
          <ul>
          {
            posts.map(item =>
              <Post key={item.id} postObj={item} 
                userConfirm={item.postUid === userObj.userObj.uid}
              ></Post>
            )
          }
          </ul>
        </div>
      </QnaBox>
    )
}

export default QnA;