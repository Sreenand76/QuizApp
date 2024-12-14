package sreenand76_QuizApp.quizApp.user;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import sreenand76_QuizApp.quizApp.Entity.User;
import sreenand76_QuizApp.quizApp.repo.UserRepository;

@Service
public class QuizUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    // Constructor for dependency injection
    public QuizUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * This method is used by Spring Security to load the user by their username (email in this case).
     * @param email The email of the user.
     * @return UserDetails object which contains user information (e.g., email, roles, etc.)
     * @throws UsernameNotFoundException if the user is not found in the database.
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Attempt to find the user by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User with email: " + email + " not found"));
        
        // Return custom UserDetails object
        return QuizUserDetails.buildUserDetails(user);
    }
}