package vacation.service;

import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import vacation.data.vacationDto;
import vacation.repository.vacationMongoRepository;

import java.util.Map;
import org.bson.types.ObjectId;

@Service
@AllArgsConstructor
public class vacationService {

    private final MongoTemplate mongoTemplate;
    private final vacationMongoRepository memberInter;

    public vacationDto saveelec(vacationDto dto) {
        // 기본 문서 필드를 저장 (여기서는 documents 컬렉션에 저장된다고 가정)
        // dto의 _id 필드가 설정되지 않았다면 ObjectId를 생성하여 설정
        if (dto.get_id() == null) {
            dto.set_id(new ObjectId());
        }
        mongoTemplate.save(dto, "documents");

        // 추가 필드가 있을 경우 처리
        if (dto.getAdditionalFields() != null) {
            // approveType을 기반으로 컬렉션 이름을 생성
            String collectionName = "type" + dto.getApproveType() + "Collection";

            // 추가 필드를 저장할 맵을 생성
            Map<String, Object> additionalData = dto.getAdditionalFields();

            // 기본 문서의 _id를 추가 필드에도 포함
            additionalData.put("documentId", dto.get_id().toString());

            // 추가 필드 데이터를 새로운 컬렉션에 삽입
            try {
                mongoTemplate.insert(additionalData, collectionName);
            } catch (Exception e) {
                // 중복된 _id로 인한 예외 처리
                System.err.println("Error inserting additional data: " + e.getMessage());
                // 필요에 따라 예외 재발생 또는 로깅
            }
        }
        return dto;
    }
}
