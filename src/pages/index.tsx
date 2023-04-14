import Image from 'next/image'
import { Inter } from 'next/font/google'
import { AppProps } from 'next/app';
import { useState } from 'react';
interface weather {
  city: string,
  temp : number,
}
interface HomeProp {
  data: weather[]
}
const inter = Inter({ subsets: ['latin'] })
const obj={
  backgroundColor:"green",
  padding:"15px 20px",
  marginLeft:"10px",
}

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:8000/citi/getAll');
  const data: weather[] = await res.json();

  return {
    props: {
      data: data
    },
  };
};

function HomePage({ data }: HomeProp){
  const [data1,setData]=useState(data)
  const getData = async () => {
    const res = await fetch('http://localhost:8000/citi/getAll');
    const data: weather[] = await res.json();
    return setData(data);
  };

  const handleClick = (event: any) => {
    // event.preventDefault();
    window.location.reload();
    // getData();
};
  return ( 
    <>
      <table style={{marginTop:"20px",marginLeft:"auto",marginRight:"auto",marginBottom:"20px"}}>
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody>
          {data1?.map((d) => (
            <tr >
              <td style={{ padding: '10px', border: '1px solid black' }}>{d.city}</td>
              <td style={{ padding: '10px', border: '1px solid black' }}>{d.temp} °C</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p></p>
      <button onClick={handleClick} style={obj}>Refresh Now</button>
    </>
  )
}

export default HomePage
