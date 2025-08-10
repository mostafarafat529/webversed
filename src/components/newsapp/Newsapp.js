import { useEffect, useState } from 'react'
import NavNews from './NavNews';
import { FaLocationArrow } from "react-icons/fa6";

const Newsapp = () => {

  const [news ,setnews] = useState([]);
  const [cat ,setcat] = useState("general")
  const [toggle ,settoggle] = useState(null);




useEffect(()=>{
fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${cat}&apiKey=204b03583a174e33acdb91793e1b8f91`)
.then((res)=>res.json()).then((data)=>{
  setnews(data.articles)
  console.log(data);
})
},[cat])

const func_toggle = (index)=>{
if(toggle === index){
  settoggle(null);
}else{
  settoggle(index);
}
}





  return (
    <div className="App">
      <NavNews setcat = {setcat}/>
      <div className="contain">
      {news.map((item ,index)=>(
        <div key={index}>
        <div className='content' >
          {item.title.slice(0,50)} <FaLocationArrow className='arrow_news' onClick={()=>func_toggle(index)}/>
        </div>
        {toggle === index &&(
<div className='card' style={{display:"flex" ,justifyContent:"space-around" ,alignItems:"center" , flexWrap: "nowrap" ,padding:"20px",
  backgroundColor:"transparent" ,border:"none" ,color:"#fff" ,textAlign:"center"
}}>
  <div className='image' style={{ flex: "1" }}>
<img src={item.urlToImage ?item.urlToImage:"https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_1280.jpg" } alt='...'  style={{width:"400px" ,height:"250px"}} />

  </div>
  <div className='info'>
      <h5 className="card-title m-3">{item.title.slice(0,50)}</h5>
      <h5 className="card-title m-3">{item.content}</h5>
      <p className="card-text">{item.description ? item.description.slice(0,100):"error"}</p>
  </div>
    </div>


        )}
        </div>
    
      ))}
      </div>
    </div>
  );
}


export default Newsapp