import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const AddStudent=()=>{
    const [name,setName]=useState("");
    const [age,setAge]=useState(0);
    const [grade,setGrade]=useState(0);
    const [clazz, setClazz] =useState(0);
    const [additionalFields,setAdditionalFields]=useState({})
    const [key,setKey]=useState("");
    const handleAdditionalFieldChange = (value) => {
        setAdditionalFields(prevFields => ({
            ...prevFields,
            [key]: value
        }));
    };
    const sendData=(e)=>{
        e.preventDefault();
        console.log({name,age,grade,clazz,additionalFields})
        console.log("sent")
        axios.post("/create",{name,age,grade,clazz,additionalFields})
        .then(res=>{
            setName("")
            setAge(0);
            setGrade(0);
            setClazz(0);
            setAdditionalFields({});
        })
    }
    return(
        <div style={{clear:'both'}}>
            <form onSubmit={sendData}>
            <table className="table table-bordered" style={{width:"500px",border:'2px solid gray',marginLeft:'50px'}}>
                <caption align="top"><h2><b>학생 리스트</b></h2></caption>
                <thead className="table-warning">
                    <tr style={{border:'1px solid gray'}}>
                        <th>이름</th>
                        <th>나이</th>
                        <th>점수</th>
                        <th>반</th>
                        <th>메모</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </td>
                    <td>
                        <input type="text" value={age} onChange={(e)=>setAge(e.target.value)}/>
                    </td>
                    <td>
                        <input type="text" value={grade} onChange={(e)=>setGrade(e.target.value)}/>
                    </td>
                    <td>
                        <input type="number" value={clazz} onChange={(e)=>setClazz(e.target.value)}/>
                    </td>
                    <td>
                                <input type="text" placeholder="Key" onChange={(e) => setKey(e.target.value)} />
                                <input type="text" placeholder="Value" onChange={(e) => handleAdditionalFieldChange(e.target.value)} />
                            </td>
                    </tr>
                    <tr><td colSpan={3}>
                    <div style={{marginLeft:'300px'}}>
                        <Button variant="contained" size="small" color="warning" type="submit" >등록</Button>
                    </div>
                    </td></tr>
                </tbody>
            </table>
            <br/><br/>
            
            </form>
        </div>
    )
}
export default AddStudent;