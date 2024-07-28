package student.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import student.data.student;
import student.service.studentService;

import java.util.List;

@RestController
@AllArgsConstructor
public class studentController {
    private final studentService service;

//    @Cacheable(value = "CachedeStudent")
    @GetMapping("/find")
    public List<student> findAll(){
        System.out.println("checkCache");
        return service.findAll();
    }

    @PostMapping("/create")
    public void save(@RequestBody student student){

        service.save(student);

    }


    @GetMapping("/getOneStudent")
    public student getOneStudent(@RequestParam String id){
        System.out.println(service.findById(id).getAdditionalFields());
        return service.findById(id);
    }
}
