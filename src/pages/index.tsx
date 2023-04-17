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

  const [sort, setSort] = useState({ key: "", direction: "" });
  const [data1,setData]=useState(data)
  const getData = async () => {
    const res = await fetch('http://localhost:8000/citi/getAll');
    const data: weather[] = await res.json();
    return setData(data);
  };

  const sortData = (data: weather[], key: string, direction: string) => {
    const compare = (a: weather, b: weather) => {
      if (key === "city") {
        return direction === "asc" ? a.city.localeCompare(b.city) : b.city.localeCompare(a.city);
      }
      return direction === "asc" ? a.temp - b.temp : b.temp - a.temp;
    };
    return data.sort(compare);
  };

  const handleClick = async (event: any) => {
    // event.preventDefault();
    // window.location.reload();
    const res = await fetch('http://localhost:8000/citi/getAll');
    const data: weather[] = await res.json();
    // setData(data);
    setData(sortData(data, sort.key, sort.direction));
    // getData();

};
const handleClickTemp=async (event:any) => {
  const res = await fetch('http://localhost:8000/citi/getAll');
  const data: weather[] = await res.json();
  // setData(data);
  console.log("clicked on temp")
  setData(data.sort((a, b) => a.temp - b.temp));
  
   
}

const handleSortClick = (key: string) => {
  const direction = sort.key === key && sort.direction === "asc" ? "desc" : "asc";
  setSort({ key, direction });
  setData(sortData(data1, key, direction));
};
  return ( 
    <>
      <table style={{marginTop:"20px",marginLeft:"auto",marginRight:"auto",marginBottom:"20px"}}>
        <thead>
          <tr>
          <th onClick={() => handleSortClick("city")}>City {sort.key === "city" && (sort.direction === "asc" ? "↑" : "↓")}</th>
          <th onClick={() => handleSortClick("temp")}>Temperature {sort.key === "temp" && (sort.direction === "asc" ? "↑" : "↓")}</th>

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
      <button onClick={handleClickTemp} style={obj}>Sort by Temp</button>
    </>
  )
}

export default HomePage

