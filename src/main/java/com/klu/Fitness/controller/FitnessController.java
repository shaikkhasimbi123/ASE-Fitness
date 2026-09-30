package com.klu.Fitness.controller;

import com.klu.Fitness.model.Goal;

import com.klu.Fitness.model.UserProfile;
import com.klu.Fitness.model.Workout;
import com.klu.Fitness.model.DietPlan;
import com.klu.Fitness.model.Feedback;
import com.klu.Fitness.repository.DietPlanRepository;
import com.klu.Fitness.repository.FeedbackRepository;
import com.klu.Fitness.repository.GoalRepository;
import com.klu.Fitness.repository.UserProfileRepository;
import com.klu.Fitness.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Controller
public class FitnessController {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private DietPlanRepository dietPlanRepository;

    @GetMapping("/")
    public String index() {
        return "home";
    }

    @GetMapping("/login")
    public String loginPage() {
        return "index";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @PostMapping("/createUser")
    public String createUser(@ModelAttribute UserProfile userProfile, @RequestParam("image") org.springframework.web.multipart.MultipartFile multipartFile) throws java.io.IOException {
        // Save user first to get the ID
        userProfile = userProfileRepository.save(userProfile);
        
        if (multipartFile != null && !multipartFile.isEmpty()) {
            String fileName = org.springframework.util.StringUtils.cleanPath(multipartFile.getOriginalFilename());
            userProfile.setProfilePhotoUrl("/user-photos/" + userProfile.getId() + "/" + fileName);
            userProfileRepository.save(userProfile);
            
            String uploadDir = "./user-photos/" + userProfile.getId();
            java.nio.file.Path uploadPath = java.nio.file.Paths.get(uploadDir);
            if (!java.nio.file.Files.exists(uploadPath)) {
                java.nio.file.Files.createDirectories(uploadPath);
            }
            try (java.io.InputStream inputStream = multipartFile.getInputStream()) {
                java.nio.file.Path filePath = uploadPath.resolve(fileName);
                java.nio.file.Files.copy(inputStream, filePath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
            }
        }
        return "redirect:/";
    }

    @PostMapping("/login")
    public String login(@RequestParam("username") String username, @RequestParam("password") String password, Model model) {
        Optional<UserProfile> userOpt = userProfileRepository.findByUsername(username);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            if (userOpt.get().isBlocked()) {
                model.addAttribute("loginError", "Your account has been blocked by the admin.");
                return "index";
            }
            return "redirect:/dashboard/" + userOpt.get().getId();
        } else {
            model.addAttribute("loginError", "Invalid username or password!");
            return "index";
        }
    }

    @GetMapping("/dashboard/{userId}")
    public String dashboard(@PathVariable Long userId, Model model) {
        Optional<UserProfile> userOpt = userProfileRepository.findById(userId);
        if (userOpt.isPresent()) {
            UserProfile user = userOpt.get();
            model.addAttribute("user", user);
            
            // Set age category for background
            String bgCategory = "adult"; // default
            if (user.getAge() <= 20) {
                bgCategory = "young";
            } else if (user.getAge() >= 50) {
                bgCategory = "senior";
            }
            model.addAttribute("bgCategory", bgCategory);

            List<Workout> workouts = workoutRepository.findByUserProfileId(userId);
            model.addAttribute("workouts", workouts);
            
            int totalCalories = workouts.stream().mapToInt(Workout::getCaloriesBurned).sum();
            int totalDuration = workouts.stream().mapToInt(Workout::getDurationMinutes).sum();
            model.addAttribute("totalCalories", totalCalories);
            model.addAttribute("totalDuration", totalDuration);

            List<Goal> goals = goalRepository.findByUserProfileId(userId);
            model.addAttribute("goals", goals);

            List<DietPlan> diets = dietPlanRepository.findByUserProfileId(userId);
            model.addAttribute("diets", diets);

            return "dashboard";
        }
        return "redirect:/";
    }

    @PostMapping("/addWorkout/{userId}")
    public String addWorkout(@PathVariable Long userId, @ModelAttribute Workout workout) {
        UserProfile user = userProfileRepository.findById(userId).orElse(null);
        if (user != null) {
            workout.setUserProfile(user);
            if (workout.getWorkoutDate() == null) {
                workout.setWorkoutDate(LocalDate.now());
            }
            workoutRepository.save(workout);
        }
        return "redirect:/dashboard/" + userId;
    }

    @PostMapping("/addGoal/{userId}")
    public String addGoal(@PathVariable Long userId, @ModelAttribute Goal goal) {
        UserProfile user = userProfileRepository.findById(userId).orElse(null);
        if (user != null) {
            goal.setUserProfile(user);
            goal.setAchieved(false);
            goalRepository.save(goal);
        }
        return "redirect:/dashboard/" + userId;
    }

    @PostMapping("/updatePhoto/{userId}")
    public String updatePhoto(@PathVariable Long userId, @RequestParam("image") org.springframework.web.multipart.MultipartFile multipartFile) throws java.io.IOException {
        UserProfile user = userProfileRepository.findById(userId).orElse(null);
        if (user != null && !multipartFile.isEmpty()) {
            String fileName = org.springframework.util.StringUtils.cleanPath(multipartFile.getOriginalFilename());
            user.setProfilePhotoUrl("/user-photos/" + userId + "/" + fileName);
            userProfileRepository.save(user);
            
            String uploadDir = "./user-photos/" + userId;
            java.nio.file.Path uploadPath = java.nio.file.Paths.get(uploadDir);
            if (!java.nio.file.Files.exists(uploadPath)) {
                java.nio.file.Files.createDirectories(uploadPath);
            }
            try (java.io.InputStream inputStream = multipartFile.getInputStream()) {
                java.nio.file.Path filePath = uploadPath.resolve(fileName);
                java.nio.file.Files.copy(inputStream, filePath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
            } catch (java.io.IOException ioe) {
                throw new java.io.IOException("Could not save image file: " + fileName, ioe);
            }
        }
        return "redirect:/dashboard/" + userId;
    }

    @GetMapping("/about")
    public String about() {
        return "about";
    }

    @GetMapping("/contact")
    public String contact() {
        return "contact";
    }

    @Autowired
    private com.klu.Fitness.service.EmailService emailService;

    @GetMapping("/feedback")
    public String feedback(org.springframework.ui.Model model) {
        return "feedback";
    }

    @PostMapping("/submit-feedback")
    public String submitFeedback(@RequestParam("userName") String userName,
                                 @RequestParam("userEmail") String userEmail,
                                 @RequestParam("userFeedback") String userFeedback, 
                                 Model model) {
        try {
            Feedback feedback = new Feedback();
            feedback.setUserName(userName);
            feedback.setUserEmail(userEmail);
            feedback.setUserFeedback(userFeedback);
            feedbackRepository.save(feedback);
            
            model.addAttribute("successMsg", "Thank you " + userName + "! Your feedback has been saved successfully.");
        } catch (Exception e) {
            System.err.println("Failed to save feedback: " + e.getMessage());
            model.addAttribute("errorMsg", "Error saving feedback. Please try again later.");
        }
        return "feedback";
    }

    @GetMapping("/admin")
    public String adminDashboard(Model model, HttpSession session) {
        if (session.getAttribute("admin") == null) {
            return "redirect:/admin/login";
        }
        java.util.List<UserProfile> users = userProfileRepository.findAll();
        java.util.List<Feedback> feedbacks = feedbackRepository.findAll();
        
        model.addAttribute("users", users);
        model.addAttribute("feedbacks", feedbacks);
        return "admin";
    }

    @GetMapping("/admin/login")
    public String adminLoginPage() {
        return "admin_login";
    }

    @PostMapping("/admin/login")
    public String adminLogin(@RequestParam("username") String username, 
                             @RequestParam("password") String password, 
                             HttpSession session, 
                             Model model) {
        if (("rechal".equals(username) && "Khasimbi@2006".equals(password)) ||
            ("khasimbi".equals(username) && "Rechal@2006".equals(password))) {
            session.setAttribute("admin", username);
            return "redirect:/admin";
        } else {
            model.addAttribute("error", "Invalid Admin Credentials");
            return "admin_login";
        }
    }

    @GetMapping("/admin/logout")
    public String adminLogout(HttpSession session) {
        session.invalidate();
        return "redirect:/admin/login";
    }

    @PostMapping("/admin/toggleBlock/{userId}")
    public String toggleBlock(@PathVariable Long userId, HttpSession session) {
        if (session.getAttribute("admin") == null) return "redirect:/admin/login";
        UserProfile user = userProfileRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setBlocked(!user.isBlocked());
            userProfileRepository.save(user);
        }
        return "redirect:/admin";
    }

    @PostMapping("/admin/deleteUser/{userId}")
    public String deleteUser(@PathVariable Long userId, HttpSession session) {
        if (session.getAttribute("admin") == null) return "redirect:/admin/login";
        userProfileRepository.deleteById(userId);
        return "redirect:/admin";
    }

    @GetMapping("/myWorkouts/{userId}")
    public String myWorkouts(@PathVariable Long userId, Model model) {
        Optional<UserProfile> userOpt = userProfileRepository.findById(userId);
        if (userOpt.isPresent()) {
            model.addAttribute("user", userOpt.get());
            model.addAttribute("workouts", workoutRepository.findByUserProfileId(userId));
            return "my_workouts";
        }
        return "redirect:/";
    }

    @GetMapping("/goalTarget/{userId}")
    public String goalTarget(@PathVariable Long userId, Model model) {
        Optional<UserProfile> userOpt = userProfileRepository.findById(userId);
        if (userOpt.isPresent()) {
            model.addAttribute("user", userOpt.get());
            model.addAttribute("goals", goalRepository.findByUserProfileId(userId));
            return "goal_target";
        }
        return "redirect:/";
    }

    @GetMapping("/dietPlan/{userId}")
    public String dietPlan(@PathVariable Long userId, Model model) {
        Optional<UserProfile> userOpt = userProfileRepository.findById(userId);
        if (userOpt.isPresent()) {
            model.addAttribute("user", userOpt.get());
            model.addAttribute("diets", dietPlanRepository.findByUserProfileId(userId));
            return "diet_plan";
        }
        return "redirect:/";
    }
}
