package sreenand76_QuizApp.quizApp.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import sreenand76_QuizApp.quizApp.Entity.Question;

public interface QuizRepository  extends JpaRepository<Question, Long> {

    @Query("SELECT DISTINCT q.subject FROM Question q")
    List<String> findDistinctSubject();
    
   

	List<Question> findBySubject(String subject);
}