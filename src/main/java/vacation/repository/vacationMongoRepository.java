package vacation.repository;

import vacation.data.vacationDto;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface vacationMongoRepository extends MongoRepository<vacationDto,String> {

}
