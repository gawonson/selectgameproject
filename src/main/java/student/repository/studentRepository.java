package student.repository;

import student.data.student;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface studentRepository extends MongoRepository<student,String> {

}
