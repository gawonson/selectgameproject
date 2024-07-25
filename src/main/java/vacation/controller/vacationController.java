package vacation.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import vacation.data.vacationDto;
import vacation.service.vacationService;

import java.util.HashMap;
import java.util.Map;

@RestController
@AllArgsConstructor
public class vacationController {
    private final vacationService service;

    @PostMapping("/app/insert")
    public String insert() {
        // 추가 필드 설정
        Map<String, Object> map = new HashMap<>();
        map.put("type", "휴가신청서");
        map.put("이건", "이거고");
        map.put("저건", "저거고");

        // DTO 객체 생성
        vacationDto dto = vacationDto.builder()
                .approveStatus(1)
                .approveType(1)
                .attachedFile("asdf.txt")
                .firstApprover("부장님")
                .secondApprover("대리님")
                .thirdApprover("과장님")
                .writer("손가원")
                .level(2)
                .additionalFields(map)
                .build();

        // MongoDB에 먼저 저장하여 _id 값 생성
        dto = service.saveelec(dto);

        // 생성된 _id를 가져와서 additionalFields에 추가
        map.put("app_id", dto.get_id().toString());
        dto.setAdditionalFields(map);

        // 수정된 DTO를 다시 저장
        service.saveelec(dto);

        return "success";
    }
}
