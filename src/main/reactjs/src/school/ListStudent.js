import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListStudent=()=>{
    const [list,setList]=useState([]);
    const navi=useNavigate();
    const getList=()=>{
    axios.get("/find")
    .then(res=>{
        setList(res.data);
    })}
    useEffect(()=>{
        getList();
    },[])

    return(
        <div>
            <table className="table table-bordered" style={{width:"500px",border:'2px solid gray',marginLeft:'50px'}}>
                <caption align="top"><h2><b>학생 리스트</b></h2></caption>
                <thead className="table-warning">
                    <tr style={{border:'1px solid gray'}}>
                        <th>번호</th>
                        <th>이름</th>
                        <th>나이</th>
                        <th>점수</th>
                        <th>반</th>
                    </tr>
                    {
                        list &&
                        list.map((list,idx)=>
                        <tr style={{textAlign:'center',border:'1px solid gray'}}>
                            <td style={{border:'1px solid gray'}}>{idx+1}</td>
                            <td style={{border:'1px solid gray'}} onClick={()=>navi(`/student/update/${list.id}`)}>{list.name}</td>
                            <td style={{border:'1px solid gray'}}>{list.age}</td>
                            <td style={{border:'1px solid gray'}}>{list.grade}</td>
                            <td style={{border:'1px solid gray'}}>{list.clazz}</td>
                        </tr>
                    )
                    }
                </thead>
            </table>
        </div>
    )
}
export default ListStudent;