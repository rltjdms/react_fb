import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, deleteDoc, updateDoc} from "firebase/firestore";
import { getStorage, ref, deleteObject,uploadString, getDownloadURL} from "firebase/storage";


//await deleteDoc(doc(db, "cities", "DC")); 문서 삭제

const Post = ({postObj, userConfirm})=> {
    // console.log(postObj)
    const deletePost = async () => {
			if(window.confirm("정말 삭제할까요?")) {
				await deleteDoc(doc(db, "posts", postObj.id));

				const storage = getStorage();

				// Create a reference to the file to delete
				const storageRef = ref(storage, postObj.attachmentUrl);

				deleteObject(storageRef);

			}
    }
		const[edit, setEdit] = useState(false);
		const[newPost, setNewPost] = useState(postObj.content);
		const [newImage, setNewImage] = useState(postObj.attachmentUrl);
		const toggleEditMode = () => setEdit((prev)=> !prev);

		let attachmentUrl = '';
		
		const onChange = (e) => {
			const {target:{value}} = e;
			setNewPost(value);
		}


		const onSubmit = async (e) => {
			e.preventDefault();
			const postRef = doc(db, 'posts', postObj.id);
			const storage = getStorage();
			const storageRef = ref(storage, postObj.attachmentUrl);
		
			if (newImage !== postObj.attachmentUrl) {
			  // 이미지를 수정한 경우에만 업로드
			  uploadString(storageRef, newImage, 'data_url').then(async (snapshot) => {
				const attachmentUrl = await getDownloadURL(storageRef);
				updatePost(postRef, attachmentUrl);
			  });
			} else {
			  // 이미지가 없는 경우 기존 attachmentUrl 사용
			  updatePost(postRef, postObj.attachmentUrl);
			}
		
			setEdit(false);
		  }
		
		  const updatePost = async (postRef, attachmentUrl) => {
			try {
			  await updateDoc(postRef, {
				content: newPost,
				attachmentUrl: attachmentUrl,
			  });
			} catch (e) {
			  console.log(e);
			}
		  }

		const onFileChange = (e) => {
			//console.log(e.target.files[0]);
			const {target:{files}} = e;
			const theFile = files[0];
	  
			const imgReader = new FileReader();
			imgReader.onload = (e) => {
			  setNewImage(e.target.result);
			}
	  
			imgReader.readAsDataURL(theFile);
		  }
		  const onFileClear = () => {
			setNewImage(null);
			document.querySelector("#attachment").value=null;
		  }


		return (
			<li>
				{edit ? (
				<>
					<form onSubmit={onSubmit}>
						<input value={newPost} onChange={onChange} />
						<input type='file' onChange={onFileChange} id="attachment" accept='images/*'/>
						{newImage && 
							<div>
								<img src={newImage} alt='' width="50" height="50"/>
								<button type='button' onClick={onFileClear}>이미지 등록 취소</button>
							</div>
						}

						<button>Update post</button>
					</form>
					<button onClick={toggleEditMode}>cancel</button>
				</>
				) : (
					<>
				
					<h4>{postObj.content}</h4>
					{postObj.attachmentUrl && <img src={postObj.attachmentUrl} alt='' width='200'/>}
					{
						userConfirm && (
							<>
								<button onClick={deletePost}>Delete</button>
								<button onClick={toggleEditMode}>Edit</button>
							</>
						)
					}
					</>
					)	
				}
			</li>
    )
}
export default Post;
