package com.klu.Fitness.model;

import jakarta.persistence.*;

@Entity
@Table(name = "diet_plan")
public class DietPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mealType;
    private String foodItems;
    private int calories;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserProfile userProfile;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMealType() { return mealType; }
    public void setMealType(String mealType) { this.mealType = mealType; }

    public String getFoodItems() { return foodItems; }
    public void setFoodItems(String foodItems) { this.foodItems = foodItems; }

    public int getCalories() { return calories; }
    public void setCalories(int calories) { this.calories = calories; }

    public UserProfile getUserProfile() { return userProfile; }
    public void setUserProfile(UserProfile userProfile) { this.userProfile = userProfile; }
}
