package com.coderscampus.springwise.repository;

import com.coderscampus.springwise.domain.SpringProject;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SpringProject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpringProjectRepository extends JpaRepository<SpringProject, Long> {}
