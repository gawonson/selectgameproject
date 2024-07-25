package vacation.data;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.WebProperties;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "elec_app")
public class vacationDto {
    @Id
    private ObjectId _id;
    private String writer;
    @CreatedDate
    private Date writeday;
    private String firstApprover;
    private String secondApprover;
    private String thirdApprover;
    private String rejectionReason;
    private String attachedFile;
    private int approveStatus;
    private int approveType;
    private int level;
    private Map<String, Object> additionalFields; // 추가 필드를 위한 맵

}
