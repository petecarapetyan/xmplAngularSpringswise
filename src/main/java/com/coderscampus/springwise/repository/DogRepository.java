package com.coderscampus.springwise.repository;

import com.coderscampus.springwise.domain.Dog;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Dog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DogRepository extends JpaRepository<Dog, Long> {}
