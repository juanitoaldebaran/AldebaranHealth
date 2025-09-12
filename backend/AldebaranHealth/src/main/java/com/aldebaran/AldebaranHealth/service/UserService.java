package com.aldebaran.AldebaranHealth.service;

import com.aldebaran.AldebaranHealth.dto.request.CreateUserRequest;
import com.aldebaran.AldebaranHealth.dto.request.LoginUserRequest;
import com.aldebaran.AldebaranHealth.model.User;
import com.aldebaran.AldebaranHealth.repository.UserRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public User createUser(CreateUserRequest createUserRequest) {
        try {
            if (userRepo.existsByEmail(createUserRequest.getEmail())) {
                logger.error("Email already exist, please create a new email");
            }

            if (userRepo.existsByUserName(createUserRequest.getUserName())) {
                logger.error("Username already exist, please create a new username");
            }

            User newUser = new User();

            newUser.setUserName(createUserRequest.getUserName());
            newUser.setEmail(createUserRequest.getEmail().toLowerCase().trim());
            newUser.setPassword(passwordEncoder.encode(createUserRequest.getPassword()));

            logger.info("Successfully create new user");
            return userRepo.save(newUser);
        } catch (Exception e) {
            logger.error("Failed to create user" + e.getMessage());
            throw new Error("Failed to create user", e);
        }
    }

    public User loginUser(LoginUserRequest loginUserRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginUserRequest.getEmail(),
                            loginUserRequest.getPassword()
                    )
            );

            logger.info("Login successfully for user");

            return userRepo.findByEmail(loginUserRequest.getEmail()).orElseThrow(() -> new RuntimeException("No user found by email" + loginUserRequest.getEmail()));
        } catch (Exception e) {
            logger.error("Failed to login user" + e.getMessage());
            throw new Error("Failed to login user", e);
        }
    }

}
