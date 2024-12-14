package sreenand76_QuizApp.quizApp.service;

import org.springframework.data.crossstore.ChangeSetPersister;
import sreenand76_QuizApp.quizApp.Entity.Question;
import java.util.List;
import java.util.Optional;


public interface IQuizService {

    Question createQuestion(Question question);

    List<Question> getAllQuestions();

    Optional<Question> getQuestionById(Long id);

    List<String> getAllSubjects();

    Question updateQuestion(Long id, Question question) throws ChangeSetPersister.NotFoundException;

    void  deleteQuestion(Long id);

    List<Question> getQuestionsForUser(Integer numOfQuestions, String subject);

	void saveQuizScore(String userEmail, String subject, int score, int totalQns);

}