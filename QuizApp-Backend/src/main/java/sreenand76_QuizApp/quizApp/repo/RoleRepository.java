package sreenand76_QuizApp.quizApp.repo;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import sreenand76_QuizApp.quizApp.Entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String role);
    boolean existsByName(String role);
	
	
}
