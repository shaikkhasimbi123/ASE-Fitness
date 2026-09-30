package com.klu.Fitness.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    public void sendFeedbackNotification(String userName, String userEmail, String feedback) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("fitness123@gmail.com");
            message.setTo("fitness123@gmail.com");
            message.setSubject("New Feedback Received from " + userName);
            message.setText("User: " + userName + "\nEmail: " + userEmail + "\n\nFeedback:\n" + feedback);
            
            if (mailSender != null) {
                mailSender.send(message);
                System.out.println("Email sent successfully to fitness123@gmail.com");
            } else {
                System.out.println("MailSender not configured. MOCK EMAIL: To fitness123@gmail.com, Feedback: " + feedback);
            }
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }
}
