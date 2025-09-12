package com.aldebaran.AldebaranHealth.controller;
import com.aldebaran.AldebaranHealth.dto.request.CreateUserRequest;
import com.aldebaran.AldebaranHealth.dto.request.LoginUserRequest;
import com.aldebaran.AldebaranHealth.dto.response.CurrentUserResponse;
import com.aldebaran.AldebaranHealth.dto.response.LoginUserResponse;
import com.aldebaran.AldebaranHealth.dto.response.UserResponse;
import com.aldebaran.AldebaranHealth.model.User;
import com.aldebaran.AldebaranHealth.service.JwtService;
import com.aldebaran.AldebaranHealth.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class UserController {
    private final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;
    private final JwtService jwtService;

    @Autowired
    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signUpUser(@RequestBody CreateUserRequest createUserRequest) {
        try {
            User newUser = userService.createUser(createUserRequest);

            UserResponse savedUserResponse = new UserResponse(newUser);
            logger.info("Successfully create a new user");

            return new ResponseEntity<>(savedUserResponse, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginUserRequest loginUserRequest) {
        try {
            User loginUser = userService.loginUser(loginUserRequest);
            String jwtToken = jwtService.generateJwtToken(loginUser);

            UserResponse newUserResponse = new UserResponse(loginUser);

            LoginUserResponse loginUserResponse = new LoginUserResponse();
            loginUserResponse.setJwtToken(jwtToken);
            loginUserResponse.setExpiresAt(jwtService.getExpirationTime());
            loginUserResponse.setUserResponse(newUserResponse);

            return new ResponseEntity<>(loginUserResponse, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping ("/api/user")
    public ResponseEntity<?> userInfo(@AuthenticationPrincipal Object principal) {
        try {
            CurrentUserResponse response = new CurrentUserResponse();

            if (principal instanceof OAuth2User oAuth2User) {
                response.setName(oAuth2User.getAttribute("name"));
                response.setEmail(oAuth2User.getAttribute("email"));
                response.setPicture(oAuth2User.getAttribute("picture"));
                response.setAuthType("GOOGLE");
                response.setRoles("ROLE_USER");
            } else if (principal instanceof UserDetails userDetails) {
                response.setName(userDetails.getUsername());
                response.setEmail(null);
                response.setPicture(null);
                response.setAuthType("LOCAL");
                response.setRoles(userDetails.getAuthorities());
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
