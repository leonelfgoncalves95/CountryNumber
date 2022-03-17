package api.services;

import api.entities.CountryNumber;
import api.repository.CountryNumberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.web.PageableHandlerMethodArgumentResolverSupport;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@Transactional
public class CountryNumberService {

    final Map<String, String> countryRegex = Map.of(
            "Cameroon","\\(237\\)\\ ?[2368]\\d{7,8}$",
            "Ethiopia","\\(251\\)\\ ?[1-59]\\d{8}$",
            "Morocco","\\(212\\)\\ ?[5-9]\\d{8}$",
            "Mozambique","\\(258\\)\\ ?[28]\\d{7,8}$",
            "Uganda","\\(256\\)\\ ?\\d{9}$"
    );

    @Autowired
    private CountryNumberRepository countryNumberRepository;

    @Transactional
    public CountryNumber createCountryNumber(CountryNumber countryNumber){
        try {
            if (!countryNumberRepository.existsByNameAndPhone(countryNumber.getName(), countryNumber.getPhone())){
                countryNumber.setId(null == countryNumberRepository.findMaxId()? 0 : countryNumberRepository.findMaxId() + 1);
                return countryNumberRepository.save(countryNumber);
            }else {
                return null;
            }
        }catch (Exception e){
            throw e;
        }
    }

    public Page<CountryNumber> getCountryNumber(String filter,Pageable page){
        if(countryRegex.containsKey(filter)){
            List<CountryNumber> pageResult = filterByCountry(filter);
            return new PageImpl<>(pageResult);
        }
        return countryNumberRepository.findAll(page);
    }

    public List<CountryNumber> filterByCountry(String filter){
        List<CountryNumber> countryNumbers = countryNumberRepository.findAll();
        String regex = countryRegex.get(filter);

        return countryNumbers.stream().filter(countryNumber ->
                        Pattern.matches(regex,countryNumber.getPhone())
                ).collect(Collectors.toList());

    }

    @Transactional
    public CountryNumber updateCountryNumber(CountryNumber countryNumber, Integer id){
        Optional<CountryNumber> countryNumberToBeUpdated = countryNumberRepository.findById(id);
        if (countryNumberToBeUpdated.isPresent()){
            try {
                countryNumber.setId(id);
                return countryNumberRepository.save(countryNumber);
            }catch (Exception e){
                throw e;
            }
        }
        return null;
    }

    @Transactional
    public CountryNumber deleteCountryNumber(Integer id){
        Optional<CountryNumber> countryNumberToBeDeleted = countryNumberRepository.findById(id);
        if (countryNumberToBeDeleted.isPresent()){
            try {
                countryNumberRepository.delete(countryNumberToBeDeleted.get());
                return countryNumberToBeDeleted.get();

            }catch (Exception e){
                throw e;
            }

        }else {
            return null;
        }
    }
}
