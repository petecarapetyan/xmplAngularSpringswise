package com.coderscampus.springwise.repository;

import com.coderscampus.springwise.domain.Frog;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Frog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FrogRepository extends JpaRepository<Frog, Long> {}
