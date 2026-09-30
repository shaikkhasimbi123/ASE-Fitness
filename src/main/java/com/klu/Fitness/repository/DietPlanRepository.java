package com.klu.Fitness.repository;

import com.klu.Fitness.model.DietPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DietPlanRepository extends JpaRepository<DietPlan, Long> {
    List<DietPlan> findByUserProfileId(Long userId);
}
