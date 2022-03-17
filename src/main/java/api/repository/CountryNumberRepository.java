package api.repository;

import api.entities.CountryNumber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;

@Repository
@Table(name = "customer")
public interface CountryNumberRepository extends JpaRepository<CountryNumber, Integer> {
    @Query("select max(c.id) from CountryNumber c")
    Integer findMaxId();

    boolean existsById(int id);

    boolean existsByNameAndPhone(String name, String phone);

    CountryNumber findById(int id);
}
