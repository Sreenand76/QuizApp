package sreenand76_QuizApp.quizApp.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sreenand76_QuizApp.quizApp.Entity.QuizScore;
import sreenand76_QuizApp.quizApp.Entity.Role;

@Repository
public interface QuizScoreRepository extends JpaRepository<QuizScore, Long> {

	List<QuizScore> findAllByuserEmail(String userEmail);
}

