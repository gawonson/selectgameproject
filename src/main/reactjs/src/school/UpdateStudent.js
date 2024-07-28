import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateStudent = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [grade, setGrade] = useState(0);
    const [clazz, setClazz] = useState(0);
    const [additionalFields, setAdditionalFields] = useState([]);
    const { id } = useParams();
    const [newKey, setNewKey] = useState('');
    const [newValue, setNewValue] = useState('');

    const getOriginalInfo = () => {
        axios.get(`/getOneStudent?id=${id}`)
            .then(res => {
                setName(res.data.name);
                setAge(res.data.age);
                setGrade(res.data.grade);
                setClazz(res.data.clazz);

                // 서버에서 받은 additionalFields를 배열 형태로 변환
                const fields = Object.entries(res.data.additionalFields || {}).map(([key, value]) => ({ key, value }));
                setAdditionalFields(fields);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getOriginalInfo();
    }, []);

    const handleFieldChange = (index, fieldKey, fieldValue) => {
        setAdditionalFields(prevFields => {
            const updatedFields = [...prevFields];
            updatedFields[index] = { key: fieldKey, value: fieldValue };
            return updatedFields;
        });
    }

    const addNewField = () => {
        setAdditionalFields(prevFields => [
            ...prevFields,
            { key: newKey, value: newValue }
        ]);
        setNewKey('');
        setNewValue('');
    }

    const setNewInfo = (e) => {
        e.preventDefault();

        // additionalFields를 객체 형태로 변환
        const additionalFieldsObject = additionalFields.reduce((obj, item) => {
            obj[item.key] = item.value;
            return obj;
        }, {});

        axios.post("/create", { id, name, age, additionalFields: additionalFieldsObject, grade, clazz })
            .then(res => {
                alert("수정완료");
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <h2>학생 수정</h2>
            <form onSubmit={setNewInfo}>
                <table>
                    <thead>
                        <tr>
                            <td>이름</td>
                            <td>나이</td>
                            <td>점수</td>
                            <td>반</td>
                            <td>추가 메모</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </td>
                            <td>
                                <input type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value))} />
                            </td>
                            <td>
                                <input type="number" value={grade} onChange={(e) => setGrade(parseInt(e.target.value))} />
                            </td>
                            <td>
                                <input type="number" value={clazz} onChange={(e) => setClazz(parseInt(e.target.value))} />
                            </td>
                            <td>
                                {additionalFields.map((field, index) => (
                                    <div key={index}>
                                        <input type="text" value={field.key} readOnly />
                                        <input type="text" value={field.value} onChange={(e) => handleFieldChange(index, field.key, e.target.value)} />
                                    </div>
                                ))}
                                <div>
                                    <input
                                        type="text"
                                        placeholder="New Key"
                                        value={newKey}
                                        onChange={(e) => setNewKey(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="New Value"
                                        value={newValue}
                                        onChange={(e) => setNewValue(e.target.value)}
                                    />
                                    <Button onClick={addNewField}>
                                        추가
                                    </Button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={5}>
                                <Button variant="outlined" color="error" type="submit">submit</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default UpdateStudent;
