package sreenand76_QuizApp.quizApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;



import jakarta.validation.Valid;
import sreenand76_QuizApp.quizApp.Entity.User;
import sreenand76_QuizApp.quizApp.exception.UserAlreadyExistsException;
import sreenand76_QuizApp.quizApp.jwt.JwtResponse;
import sreenand76_QuizApp.quizApp.jwt.JwtUtils;
import sreenand76_QuizApp.quizApp.request.LoginRequest;
import sreenand76_QuizApp.quizApp.service.IUserService;
import sreenand76_QuizApp.quizApp.user.QuizUserDetails;

import java.util.List;


@RestController
@RequestMapping("/api/quizzes/auth")
public class AuthController {

    private final IUserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    // Constructor for dependency injection
    @Autowired
    public AuthController(IUserService userService, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    /**
     * Registers a new user.
     * @param user The user to be registered.
     * @return A success message if registration is successful, or a conflict status if the user already exists.
     */
    @PostMapping("/register-user")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("Registration successful!");
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtTokenForUser(authentication);
        QuizUserDetails userDetails = (QuizUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        return ResponseEntity.ok(new JwtResponse(
                userDetails.getId(),
                userDetails.getEmail(),
                jwt,
                roles));
    }
}