import React, {useState} from 'react'
import {app} from "../firebase";
import {getFirestore, collection, addDoc} from "firebase/firestore"; 
import {getStorage, getDownloadURL, ref, uploadBytes} from "firebase/storage"
const firestore = getFirestore(app);
const storage = getStorage(app)


export default function AddBook(props) {
  const {user} = props

    const [data, setData]= useState({bookname:"", isbn: "", price:"", image:""})
    const changeHandler = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const imageHandler = (e)=>{
      setData({...data, image: e.target.files[0]})
    }

    const addBook = async()=>{
        try {

            const path = `uploads/images/${Date.now()}-${data.image.name}`;
            const imageRef = ref(storage, path)
            const uploadResult = await uploadBytes(imageRef, data.image).then(async(snapshot) => {

                getDownloadURL(imageRef)
                .then((url) => {
                  console.log(url)
                })
                .catch((error) => {
                  // Handle any errors
                });
                console.log(snapshot)
                const docRef = await addDoc(collection(firestore, "books"), {
                  name: data.bookname,
                  isbn: data.isbn,
                  price: data.price,
                  imageURL: snapshot.ref.fullPath,
                  userID: user.uid,
                  userEmail: user.email
                });
                console.log(docRef);
                
            });
          
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }

  return (
    <div className="border p-3">
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Book Name</label>
            <input type="email" value={data.bookname} name="bookname" onChange={changeHandler } className="form-control" id="exampleFormControlInput1"/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">ISBN Number</label>
            <input type="isbn" value={data.isbn} name="isbn" onChange={changeHandler } className="form-control" id="exampleFormControlInput1"/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Price</label>
            <input type="price" value={data.price} name="price" onChange={changeHandler } className="form-control" id="exampleFormControlInput1"/>
        </div>
        <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Book image</label>
            <input onChange={imageHandler } className="form-control"  name="image" type="file" id="formFile"/>
        </div>
        <br/>
        <button onClick={addBook}>ADD</button>

    </div>
  )
}
