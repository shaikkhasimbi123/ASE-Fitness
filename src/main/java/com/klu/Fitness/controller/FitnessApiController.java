package com.klu.Fitness.controller;

import com.klu.Fitness.model.Workout;
import com.klu.Fitness.model.UserProfile;
import com.klu.Fitness.model.Goal;
import com.klu.Fitness.model.Feedback;
import com.klu.Fitness.model.DietPlan;
import com.klu.Fitness.repository.WorkoutRepository;
import com.klu.Fitness.repository.UserProfileRepository;
import com.klu.Fitness.repository.GoalRepository;
import com.klu.Fitness.repository.FeedbackRepository;
import com.klu.Fitness.repository.DietPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class FitnessApiController {

    @Autowired
    private WorkoutRepository workoutRepository;
    
    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private DietPlanRepository dietPlanRepository;

    @Autowired
    private com.klu.Fitness.service.EmailService emailService;

    @GetMapping("/stats/{userId}")
    public Map<String, Object> getUserStats(@PathVariable Long userId) {
        List<Workout> workouts = workoutRepository.findByUserProfileId(userId);
        
        int totalCalories = workouts.stream().mapToInt(Workout::getCaloriesBurned).sum();
        int totalDuration = workouts.stream().mapToInt(Workout::getDurationMinutes).sum();
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalCalories", totalCalories);
        stats.put("totalDuration", totalDuration);
        stats.put("workoutCount", workouts.size());
        
        return stats;
    }

    @GetMapping("/workouts/{userId}")
    public List<Workout> getUserWorkouts(@PathVariable Long userId) {
        return workoutRepository.findByUserProfileId(userId);
    }

    @GetMapping("/goals/{userId}")
    public List<Goal> getUserGoals(@PathVariable Long userId) {
        return goalRepository.findByUserProfileId(userId);
    }

    @GetMapping("/diets/{userId}")
    public List<DietPlan> getUserDiets(@PathVariable Long userId) {
        return dietPlanRepository.findByUserProfileId(userId);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@ModelAttribute UserProfile userProfile, @RequestParam(value = "image", required = false) org.springframework.web.multipart.MultipartFile multipartFile) {
        try {
            // Save user first to get the ID
            UserProfile savedUser = userProfileRepository.save(userProfile);
            
            if (multipartFile != null && !multipartFile.isEmpty()) {
                String fileName = org.springframework.util.StringUtils.cleanPath(multipartFile.getOriginalFilename());
                savedUser.setProfilePhotoUrl("/user-photos/" + savedUser.getId() + "/" + fileName);
                userProfileRepository.save(savedUser);
                
                String uploadDir = "./user-photos/" + savedUser.getId();
                java.nio.file.Path uploadPath = java.nio.file.Paths.get(uploadDir);
                if (!java.nio.file.Files.exists(uploadPath)) {
                    java.nio.file.Files.createDirectories(uploadPath);
                }
                try (java.io.InputStream inputStream = multipartFile.getInputStream()) {
                    java.nio.file.Path filePath = uploadPath.resolve(fileName);
                    java.nio.file.Files.copy(inputStream, filePath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
                }
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("user", savedUser);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        Optional<UserProfile> userOpt = userProfileRepository.findByUsername(username);
        
        Map<String, Object> response = new HashMap<>();
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            if (userOpt.get().isBlocked()) {
                response.put("status", "error");
                response.put("message", "Account blocked by Admin");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }
            response.put("status", "success");
            response.put("user", userOpt.get());
            return ResponseEntity.ok(response);
        }
        response.put("status", "error");
        response.put("message", "Invalid username or password");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @PostMapping("/workout/{userId}")
    public ResponseEntity<?> addWorkout(@PathVariable Long userId, @RequestBody Workout workout) {
        try {
            Optional<UserProfile> userOpt = userProfileRepository.findById(userId);
            if (userOpt.isPresent()) {
                workout.setUserProfile(userOpt.get());
                if (workout.getWorkoutDate() == null) workout.setWorkoutDate(java.time.LocalDate.now());
                Workout saved = workoutRepository.save(workout);
                return ResponseEntity.ok(saved);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());
        }
    }

    @PostMapping("/goal/{userId}")
    public ResponseEntity<?> addGoal(@PathVariable Long userId, @RequestBody Goal goal) {
        try {
            Optional<UserProfile> userOpt = userProfileRepository.findById(userId);
            if (userOpt.isPresent()) {
                goal.setUserProfile(userOpt.get());
                goal.setAchieved(false);
                return ResponseEntity.ok(goalRepository.save(goal));
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());
        }
    }

    @PostMapping("/diet/{userId}")
    public ResponseEntity<?> addDietPlan(@PathVariable Long userId, @RequestBody DietPlan dietPlan) {
        try {
            Optional<UserProfile> userOpt = userProfileRepository.findById(userId);
            if (userOpt.isPresent()) {
                dietPlan.setUserProfile(userOpt.get());
                return ResponseEntity.ok(dietPlanRepository.save(dietPlan));
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());
        }
    }

    @PostMapping("/feedback")
    public ResponseEntity<?> submitFeedback(@RequestBody Feedback feedback) {
      try {
        Feedback saved = feedbackRepository.save(feedback);
        // Send Notification to Gmail
        emailService.sendFeedbackNotification(saved.getUserName(), saved.getUserEmail(), saved.getUserFeedback());
        return ResponseEntity.ok(saved);
      } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
      }
    }

    // --- ADMIN ENDPOINTS ---

    @GetMapping("/admin/users")
    public List<UserProfile> getAllUsers() {
      return userProfileRepository.findAll();
    }

    @PostMapping("/admin/toggle-status/{userId}")
    public ResponseEntity<?> toggleUserStatus(@PathVariable Long userId) {
      return userProfileRepository.findById(userId).map(user -> {
        user.setBlocked(!user.isBlocked());
        userProfileRepository.save(user);
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("newStatus", user.isBlocked() ? "blocked" : "active");
        return ResponseEntity.ok(response);
      }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/admin/feedbacks")
    public List<Feedback> getAllFeedbacks() {
      return feedbackRepository.findAll();
    }
}
