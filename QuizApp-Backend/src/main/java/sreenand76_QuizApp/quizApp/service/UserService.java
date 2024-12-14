package sreenand76_QuizApp.quizApp.service;

import jakarta.transaction.Transactional;
import sreenand76_QuizApp.quizApp.Entity.QuizScore;
import sreenand76_QuizApp.quizApp.Entity.Role;
import sreenand76_QuizApp.quizApp.Entity.User;
import sreenand76_QuizApp.quizApp.exception.UserAlreadyExistsException;
import sreenand76_QuizApp.quizApp.repo.QuizScoreRepository;
import sreenand76_QuizApp.quizApp.repo.RoleRepository;
import sreenand76_QuizApp.quizApp.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;



@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final QuizScoreRepository quizRepository;

    // Constructor for dependency injection
    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository,QuizScoreRepository quizRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.quizRepository=quizRepository;
    }

    @Override
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user.getPassword());
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Default role not found"));
        user.setRoles(Collections.singletonList(userRole));
        return userRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Transactional
    @Override
    public void deleteUser(String email) {
        User theUser = getUser(email);
        if (theUser != null) {
            userRepository.deleteByEmail(email);
        }
    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

	@Override
	public List<QuizScore> getUserRecentAttempts(String email) {
		return quizRepository.findAllByuserEmail(email);
	}
	
	@Override
	public void updateUserRole(Long userId, String roleName) throws Exception {
        // Fetch the user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found with ID: " + userId));

        // Fetch the role
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new Exception("Role not found with name: " + roleName));

        // Clear existing roles
        user.getRoles().clear();

        // Add the new role
        user.getRoles().add(role);

        // Save the updated user
        userRepository.save(user);
    }
}
