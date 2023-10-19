package com.coderscampus.springwise.repository;

import com.coderscampus.springwise.domain.Airplane;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Airplane entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AirplaneRepository extends JpaRepository<Airplane, Long> {}
