package com.klu.Fitness.repository;

import com.klu.Fitness.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    java.util.Optional<UserProfile> findByUsername(String username);
}
