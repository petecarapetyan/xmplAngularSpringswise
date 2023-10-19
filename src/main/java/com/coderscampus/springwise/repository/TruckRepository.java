package com.coderscampus.springwise.repository;

import com.coderscampus.springwise.domain.Truck;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Truck entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TruckRepository extends JpaRepository<Truck, Long> {}
