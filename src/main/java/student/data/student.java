package student.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Map;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "student")
public class student implements Serializable {
    @Id
    private String id;
    private String name;
    private double age;
    private int grade;
    private int clazz;
    private Map<String, Object> additionalFields;

}
