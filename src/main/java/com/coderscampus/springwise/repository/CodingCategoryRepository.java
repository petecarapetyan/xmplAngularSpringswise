package com.coderscampus.springwise.repository;

import com.coderscampus.springwise.domain.CodingCategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CodingCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CodingCategoryRepository extends JpaRepository<CodingCategory, Long> {}
