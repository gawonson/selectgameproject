import { Route, Routes } from "react-router-dom";

import Menu from "../school/Menu";
import AddStudent from "../school/AddStudent";
import ListStudent from "../school/ListStudent";
import UpdateStudent from "../school/UpdateStudent";
const router = ()=>{
    return(
        <div>
            <Menu/>
            <br style={{clear:'both'}}/>
            <Routes>
                <Route path="/student">
                    <Route path="form" element={<AddStudent/>}/>
                    <Route path="list" element={<ListStudent/>}/>
                    <Route path="update/:id" element={<UpdateStudent/>}/>
                </Route>
            </Routes>
        </div>
    )
}
export default router;