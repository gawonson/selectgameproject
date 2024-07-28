package student.service;

import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import student.data.student;
import student.repository.studentRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class studentService {

    private final studentRepository repository;
    private final MongoTemplate mongoTemplate;

    public List<student> findAll(){
        return repository.findAll();
    }

    public void save(student student) {
        // 학생을 저장하고 저장된 객체를 반환받습니다.
        student savedStudent = repository.save(student);
        // 저장된 객체에서 _id 값을 가져옵니다.
        String id = savedStudent.getId();

        if (student.getClazz() != 0 && student.getAdditionalFields() != null) {
            Map<String, Object> additionalFieldsDoc = new HashMap<>();
            additionalFieldsDoc.put("student_id", id);
            additionalFieldsDoc.putAll(student.getAdditionalFields());

            //기존 값 지우기
            // 기존 student_id를 가진 도큐먼트 삭제
            Query query = new Query(Criteria.where("student_id").is(id));
            mongoTemplate.remove(query, "class" + student.getClazz());
            // 새로운 컬렉션에 저장
            mongoTemplate.save(additionalFieldsDoc, "class" + student.getClazz());
        }
    }

    public student findById(String id){
        return repository.findById(id).get();
    }
}
