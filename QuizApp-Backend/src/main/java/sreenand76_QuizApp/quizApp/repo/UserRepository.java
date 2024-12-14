package sreenand76_QuizApp.quizApp.repo;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import sreenand76_QuizApp.quizApp.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);

    void deleteByEmail(String email);

   Optional<User> findByEmail(String email);
}
