package api.controllers;

import api.entities.CountryNumber;
import api.services.CountryNumberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/numbers")
@CrossOrigin(origins = "http://localhost:3000")
public class CountryNumberController {

    @Autowired
    private CountryNumberService countryNumberService;

    @PostMapping
    public ResponseEntity<CountryNumber> createCountryNumber(@RequestBody CountryNumber countryNumber) {
        CountryNumber result = countryNumberService.createCountryNumber(countryNumber);
        if(result!=null){
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        }
        return new ResponseEntity("Name and Phone already exists.",HttpStatus.BAD_REQUEST);
    }

    @GetMapping
    public ResponseEntity<List<CountryNumber>> getCountryNumber(@RequestParam(name = "filter", defaultValue = "") String countryFilter,
                                                                @PageableDefault(page = 0, size = 100)Pageable page){
        Page<CountryNumber> allNumbers = countryNumberService.getCountryNumber(countryFilter,page);
        return new ResponseEntity(allNumbers, HttpStatus.OK);
    }


    @PutMapping("/{id}")
    public ResponseEntity updateCountryNumber(
            @RequestBody CountryNumber countryNumber,
            @PathVariable Integer id
            ){
        CountryNumber result = countryNumberService.updateCountryNumber(countryNumber,id);
        if(result!=null){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity("Could not update.",HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteCountryNumber(@PathVariable Integer id){
        CountryNumber result = countryNumberService.deleteCountryNumber(id);
        if(result!=null){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity("Could not delete.",HttpStatus.BAD_REQUEST);
    }

}
