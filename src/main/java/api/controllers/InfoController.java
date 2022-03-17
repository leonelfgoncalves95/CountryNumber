package api.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/info")
public class InfoController {

    @GetMapping
    public String info(){
        return "This application was made with <3 by Leonel Gonçalves.\n" +
                "Linkdin: https://www.linkedin.com/in/leonelgon%C3%A7alves95/\n";
    }
}
